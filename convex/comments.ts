import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
	args: {
		storyId: v.id("stories"),
		parentId: v.optional(v.id("comments")),
		body: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		if (args.body.length === 0 || args.body.length > 2000) {
			throw new Error("Comment must be 1-2000 characters");
		}

		// Verify story exists and is not removed
		const story = await ctx.db.get(args.storyId);
		if (!story || story.isRemoved) {
			throw new Error("Story not found");
		}

		// If replying, verify parent comment exists and enforce max 2 levels
		if (args.parentId) {
			const parent = await ctx.db.get(args.parentId);
			if (!parent || parent.isRemoved) {
				throw new Error("Parent comment not found");
			}
			// If parent itself has a parentId, this would be level 3 — not allowed
			if (parent.parentId) {
				throw new Error("Maximum reply depth reached");
			}
		}

		const now = Date.now();
		return await ctx.db.insert("comments", {
			storyId: args.storyId,
			authorId: userId,
			parentId: args.parentId,
			body: args.body,
			upvotes: 0,
			downvotes: 0,
			isRemoved: false,
			createdAt: now,
		});
	},
});

export const getByStory = query({
	args: { storyId: v.id("stories") },
	handler: async (ctx, args) => {
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_story", (q) => q.eq("storyId", args.storyId))
			.order("desc")
			.collect();

		// Filter removed comments
		const visible = comments.filter((c) => !c.isRemoved);

		// Enrich with author info
		const enriched = await Promise.all(
			visible.map(async (comment) => {
				const author = await ctx.db.get(comment.authorId);
				return {
					...comment,
					authorUsername: author?.username ?? "anonymous",
				};
			}),
		);

		// Separate top-level and replies
		const topLevel = enriched.filter((c) => !c.parentId);
		const replies = enriched.filter((c) => c.parentId);

		// Sort top-level by upvotes (top) descending
		topLevel.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes));

		// Attach replies to parents
		return topLevel.map((comment) => ({
			...comment,
			replies: replies
				.filter((r) => r.parentId === comment._id)
				.sort((a, b) => a.createdAt - b.createdAt),
		}));
	},
});
