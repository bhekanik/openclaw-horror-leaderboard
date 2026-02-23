import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,

	users: defineTable({
		// Convex Auth core fields
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		isAnonymous: v.optional(v.boolean()),
		// App-specific fields (optional with defaults set after first login)
		username: v.optional(v.string()),
		displayName: v.optional(v.string()),
		avatarUrl: v.optional(v.string()),
		karma: v.optional(v.number()),
		storiesCount: v.optional(v.number()),
		totalHorrorScore: v.optional(v.float64()),
		badges: v.optional(v.array(v.string())),
		isBanned: v.optional(v.boolean()),
		isAdmin: v.optional(v.boolean()),
	})
		.index("by_username", ["username"])
		.index("by_karma", ["karma"])
		.index("email", ["email"]),

	stories: defineTable({
		authorId: v.id("users"),
		title: v.string(),
		body: v.string(),
		category: v.string(),
		severity: v.number(),
		incidentDate: v.optional(v.string()),
		openclawVersion: v.optional(v.string()),
		tags: v.array(v.string()),
		upvotes: v.number(),
		downvotes: v.number(),
		fakeFlags: v.number(),
		verifiedFlags: v.number(),
		ripVotes: v.number(),
		totalVotes: v.number(),
		horrorScore: v.float64(),
		communitySeverity: v.float64(),
		receiptIds: v.array(v.id("receipts")),
		isHidden: v.boolean(),
		isRemoved: v.boolean(),
		reportCount: v.number(),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_horrorScore", ["horrorScore"])
		.index("by_createdAt", ["createdAt"])
		.index("by_category", ["category", "horrorScore"])
		.index("by_author", ["authorId", "createdAt"])
		.index("by_reportCount", ["reportCount"]),

	receipts: defineTable({
		storyId: v.id("stories"),
		type: v.union(v.literal("screenshot"), v.literal("link"), v.literal("transcript")),
		storageId: v.optional(v.id("_storage")),
		url: v.optional(v.string()),
		content: v.optional(v.string()),
		caption: v.optional(v.string()),
		createdAt: v.number(),
	}).index("by_story", ["storyId"]),

	votes: defineTable({
		userId: v.id("users"),
		storyId: v.id("stories"),
		type: v.union(
			v.literal("upvote"),
			v.literal("downvote"),
			v.literal("fake"),
			v.literal("verified"),
			v.literal("rip"),
		),
		createdAt: v.number(),
	})
		.index("by_user_story", ["userId", "storyId"])
		.index("by_story", ["storyId"])
		.index("by_user", ["userId"]),

	comments: defineTable({
		storyId: v.id("stories"),
		authorId: v.id("users"),
		parentId: v.optional(v.id("comments")),
		body: v.string(),
		upvotes: v.number(),
		downvotes: v.number(),
		isRemoved: v.boolean(),
		createdAt: v.number(),
	})
		.index("by_story", ["storyId", "createdAt"])
		.index("by_parent", ["parentId", "createdAt"])
		.index("by_author", ["authorId"]),

	commentVotes: defineTable({
		userId: v.id("users"),
		commentId: v.id("comments"),
		type: v.union(v.literal("upvote"), v.literal("downvote")),
		createdAt: v.number(),
	})
		.index("by_user_comment", ["userId", "commentId"])
		.index("by_comment", ["commentId"]),

	reports: defineTable({
		reporterId: v.id("users"),
		storyId: v.optional(v.id("stories")),
		commentId: v.optional(v.id("comments")),
		reason: v.string(),
		status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("actioned")),
		createdAt: v.number(),
	}).index("by_status", ["status", "createdAt"]),
});
