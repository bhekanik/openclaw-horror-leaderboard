import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByStory = query({
	args: { storyId: v.id("stories") },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("receipts")
			.withIndex("by_story", (q) => q.eq("storyId", args.storyId))
			.collect();
	},
});

export const getUrl = query({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.storageId);
	},
});
