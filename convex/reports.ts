import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const VALID_REASONS = ["spam", "fake_story", "harassment", "inappropriate", "duplicate", "other"];

export const create = mutation({
	args: {
		storyId: v.optional(v.id("stories")),
		commentId: v.optional(v.id("comments")),
		reason: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		if (!args.storyId && !args.commentId) {
			throw new Error("Must report either a story or a comment");
		}

		if (!VALID_REASONS.includes(args.reason)) {
			throw new Error("Invalid report reason");
		}

		// Check for duplicate report
		const existing = await ctx.db
			.query("reports")
			.filter((q) =>
				q.and(
					q.eq(q.field("reporterId"), userId),
					args.storyId
						? q.eq(q.field("storyId"), args.storyId)
						: q.eq(q.field("commentId"), args.commentId),
				),
			)
			.first();

		if (existing) {
			throw new Error("You have already reported this content");
		}

		const reportId = await ctx.db.insert("reports", {
			reporterId: userId,
			storyId: args.storyId,
			commentId: args.commentId,
			reason: args.reason,
			status: "pending",
			createdAt: Date.now(),
		});

		// Increment story report count if reporting a story
		if (args.storyId) {
			const story = await ctx.db.get(args.storyId);
			if (story) {
				await ctx.db.patch(args.storyId, {
					reportCount: (story.reportCount ?? 0) + 1,
				});
			}
		}

		return reportId;
	},
});

export const listPending = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		const user = await ctx.db.get(userId);
		if (!user?.isAdmin) throw new Error("Admin access required");

		return await ctx.db
			.query("reports")
			.withIndex("by_status", (q) => q.eq("status", "pending"))
			.order("desc")
			.collect();
	},
});
