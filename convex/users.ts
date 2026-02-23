import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const currentUser = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) {
			return null;
		}
		return await ctx.db.get(userId);
	},
});

export const getById = query({
	args: { id: v.id("users") },
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	},
});

export const getByUsername = query({
	args: { username: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_username", (q) => q.eq("username", args.username))
			.first();
		if (!user) return null;
		return {
			_id: user._id,
			username: user.username,
			displayName: user.displayName,
			avatarUrl: user.avatarUrl,
			karma: user.karma ?? 0,
			storiesCount: user.storiesCount ?? 0,
			totalHorrorScore: user.totalHorrorScore ?? 0,
			badges: user.badges ?? [],
			_creationTime: user._creationTime,
		};
	},
});

export const setUsername = mutation({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) {
			throw new Error("Not authenticated");
		}

		// Validate username format
		const username = args.username.trim().toLowerCase();
		if (username.length < 3 || username.length > 20) {
			throw new Error("Username must be 3-20 characters");
		}
		if (!/^[a-z0-9_]+$/.test(username)) {
			throw new Error("Username can only contain letters, numbers, and underscores");
		}

		// Check uniqueness
		const existing = await ctx.db
			.query("users")
			.withIndex("by_username", (q) => q.eq("username", username))
			.first();
		if (existing && existing._id !== userId) {
			throw new Error("Username already taken");
		}

		await ctx.db.patch(userId, { username });
	},
});
