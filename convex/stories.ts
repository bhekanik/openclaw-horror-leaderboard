import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
	args: {
		title: v.string(),
		body: v.string(),
		category: v.string(),
		severity: v.number(),
		incidentDate: v.optional(v.string()),
		openclawVersion: v.optional(v.string()),
		tags: v.array(v.string()),
		receipts: v.array(
			v.object({
				type: v.union(v.literal("screenshot"), v.literal("link"), v.literal("transcript")),
				storageId: v.optional(v.id("_storage")),
				url: v.optional(v.string()),
				content: v.optional(v.string()),
				caption: v.optional(v.string()),
			}),
		),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		// Validate
		if (args.title.length === 0 || args.title.length > 200) {
			throw new Error("Title must be 1-200 characters");
		}
		if (args.body.length === 0 || args.body.length > 10000) {
			throw new Error("Body must be 1-10,000 characters");
		}
		if (args.receipts.length === 0) {
			throw new Error("At least one receipt is required");
		}
		if (args.tags.length > 5) {
			throw new Error("Maximum 5 tags allowed");
		}
		if (args.severity < 1 || args.severity > 5) {
			throw new Error("Severity must be 1-5");
		}

		const validCategories = [
			"rogue",
			"cost_money",
			"scared_me",
			"security",
			"epic_fail",
			"identity_crisis",
			"almost_catastrophic",
		];
		if (!validCategories.includes(args.category)) {
			throw new Error("Invalid category");
		}

		// Check user is not banned
		const user = await ctx.db.get(userId);
		if (!user || user.isBanned) {
			throw new Error("User is banned");
		}

		const now = Date.now();

		// Create story (without receipt IDs first)
		const storyId = await ctx.db.insert("stories", {
			authorId: userId,
			title: args.title.trim(),
			body: args.body,
			category: args.category,
			severity: args.severity,
			incidentDate: args.incidentDate,
			openclawVersion: args.openclawVersion,
			tags: args.tags.slice(0, 5),
			upvotes: 0,
			downvotes: 0,
			fakeFlags: 0,
			verifiedFlags: 0,
			ripVotes: 0,
			totalVotes: 0,
			horrorScore: 0,
			communitySeverity: args.severity,
			receiptIds: [],
			isHidden: false,
			isRemoved: false,
			reportCount: 0,
			createdAt: now,
			updatedAt: now,
		});

		// Create receipts
		const receiptIds = [];
		for (const receipt of args.receipts) {
			const receiptId = await ctx.db.insert("receipts", {
				storyId,
				type: receipt.type,
				storageId: receipt.storageId,
				url: receipt.url,
				content: receipt.content,
				caption: receipt.caption,
				createdAt: now,
			});
			receiptIds.push(receiptId);
		}

		// Update story with receipt IDs
		await ctx.db.patch(storyId, { receiptIds });

		// Increment user's story count
		await ctx.db.patch(userId, {
			storiesCount: (user.storiesCount ?? 0) + 1,
		});

		return storyId;
	},
});

export const generateUploadUrl = mutation({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");
		return await ctx.storage.generateUploadUrl();
	},
});

export const getById = query({
	args: { id: v.id("stories") },
	handler: async (ctx, args) => {
		const story = await ctx.db.get(args.id);
		if (!story || story.isRemoved) return null;
		return story;
	},
});

export const list = query({
	args: {
		timeRange: v.optional(v.union(v.literal("week"), v.literal("month"), v.literal("all"))),
		category: v.optional(v.string()),
		sortBy: v.optional(
			v.union(v.literal("score"), v.literal("recent"), v.literal("controversial")),
		),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const limit = args.limit ?? 20;
		let stories;

		if (args.category) {
			stories = await ctx.db
				.query("stories")
				.withIndex("by_category", (q) => q.eq("category", args.category!))
				.order("desc")
				.collect();
		} else if (args.sortBy === "recent") {
			stories = await ctx.db.query("stories").withIndex("by_createdAt").order("desc").collect();
		} else {
			stories = await ctx.db.query("stories").withIndex("by_horrorScore").order("desc").collect();
		}

		// Filter hidden/removed
		stories = stories.filter((s) => !s.isHidden && !s.isRemoved);

		// Time range filter
		if (args.timeRange && args.timeRange !== "all") {
			const now = Date.now();
			const cutoff =
				args.timeRange === "week" ? now - 7 * 24 * 60 * 60 * 1000 : now - 30 * 24 * 60 * 60 * 1000;
			stories = stories.filter((s) => s.createdAt >= cutoff);
		}

		// Controversial sort: high total votes, close to 50/50
		if (args.sortBy === "controversial") {
			stories.sort((a, b) => {
				const aRatio = a.totalVotes > 0 ? Math.abs(0.5 - a.upvotes / a.totalVotes) : 1;
				const bRatio = b.totalVotes > 0 ? Math.abs(0.5 - b.upvotes / b.totalVotes) : 1;
				// Lower ratio = more controversial, break ties by total votes
				if (aRatio !== bRatio) return aRatio - bRatio;
				return b.totalVotes - a.totalVotes;
			});
		}

		return stories.slice(0, limit);
	},
});

export const listByAuthor = query({
	args: { authorId: v.id("users") },
	handler: async (ctx, args) => {
		const stories = await ctx.db
			.query("stories")
			.withIndex("by_author", (q) => q.eq("authorId", args.authorId))
			.order("desc")
			.collect();
		return stories.filter((s) => !s.isHidden && !s.isRemoved);
	},
});
