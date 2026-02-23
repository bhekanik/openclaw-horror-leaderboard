import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const cast = mutation({
	args: {
		commentId: v.id("comments"),
		type: v.union(v.literal("upvote"), v.literal("downvote")),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		const comment = await ctx.db.get(args.commentId);
		if (!comment || comment.isRemoved) {
			throw new Error("Comment not found");
		}

		// Check for existing vote
		const existing = await ctx.db
			.query("commentVotes")
			.withIndex("by_user_comment", (q) => q.eq("userId", userId).eq("commentId", args.commentId))
			.unique();

		if (existing) {
			if (existing.type === args.type) {
				// Same vote — remove it (toggle off)
				await ctx.db.delete(existing._id);
				await ctx.db.patch(args.commentId, {
					[args.type === "upvote" ? "upvotes" : "downvotes"]:
						comment[args.type === "upvote" ? "upvotes" : "downvotes"] - 1,
				});
			} else {
				// Different vote — switch
				await ctx.db.patch(existing._id, { type: args.type });
				const inc = args.type === "upvote" ? "upvotes" : "downvotes";
				const dec = args.type === "upvote" ? "downvotes" : "upvotes";
				await ctx.db.patch(args.commentId, {
					[inc]: comment[inc] + 1,
					[dec]: comment[dec] - 1,
				});
			}
		} else {
			// New vote
			await ctx.db.insert("commentVotes", {
				userId,
				commentId: args.commentId,
				type: args.type,
				createdAt: Date.now(),
			});
			await ctx.db.patch(args.commentId, {
				[args.type === "upvote" ? "upvotes" : "downvotes"]:
					comment[args.type === "upvote" ? "upvotes" : "downvotes"] + 1,
			});
		}
	},
});

export const getUserVotes = query({
	args: { commentIds: v.array(v.id("comments")) },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return {};

		const votes: Record<string, string> = {};
		for (const commentId of args.commentIds) {
			const vote = await ctx.db
				.query("commentVotes")
				.withIndex("by_user_comment", (q) => q.eq("userId", userId).eq("commentId", commentId))
				.unique();
			if (vote) {
				votes[commentId] = vote.type;
			}
		}
		return votes;
	},
});
