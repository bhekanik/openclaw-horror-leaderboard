import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function requireAdmin(ctx: any) {
	const userId = await getAuthUserId(ctx);
	if (!userId) throw new Error("Not authenticated");
	const user = await ctx.db.get(userId);
	if (!user?.isAdmin) throw new Error("Admin access required");
	return userId;
}

export const reviewReport = mutation({
	args: {
		reportId: v.id("reports"),
		status: v.union(v.literal("reviewed"), v.literal("actioned")),
	},
	handler: async (ctx, args) => {
		await requireAdmin(ctx);
		const report = await ctx.db.get(args.reportId);
		if (!report) throw new Error("Report not found");
		await ctx.db.patch(args.reportId, { status: args.status });
	},
});

export const removeStory = mutation({
	args: { storyId: v.id("stories") },
	handler: async (ctx, args) => {
		await requireAdmin(ctx);
		const story = await ctx.db.get(args.storyId);
		if (!story) throw new Error("Story not found");
		await ctx.db.patch(args.storyId, { isRemoved: true });
	},
});

export const restoreStory = mutation({
	args: { storyId: v.id("stories") },
	handler: async (ctx, args) => {
		await requireAdmin(ctx);
		const story = await ctx.db.get(args.storyId);
		if (!story) throw new Error("Story not found");
		await ctx.db.patch(args.storyId, { isRemoved: false });
	},
});

export const banUser = mutation({
	args: { userId: v.id("users") },
	handler: async (ctx, args) => {
		await requireAdmin(ctx);
		const user = await ctx.db.get(args.userId);
		if (!user) throw new Error("User not found");
		await ctx.db.patch(args.userId, { isBanned: true });
	},
});

export const unbanUser = mutation({
	args: { userId: v.id("users") },
	handler: async (ctx, args) => {
		await requireAdmin(ctx);
		const user = await ctx.db.get(args.userId);
		if (!user) throw new Error("User not found");
		await ctx.db.patch(args.userId, { isBanned: false });
	},
});

export const getStats = query({
	args: {},
	handler: async (ctx) => {
		await requireAdmin(ctx);

		const pendingReports = await ctx.db
			.query("reports")
			.withIndex("by_status", (q) => q.eq("status", "pending"))
			.collect();

		return {
			pendingReportCount: pendingReports.length,
		};
	},
});
