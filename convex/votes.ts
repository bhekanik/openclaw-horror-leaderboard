import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { calculateHorrorScore } from "./lib/scoring";

const VOTE_TYPES = ["upvote", "downvote", "fake", "verified", "rip"] as const;

export const cast = mutation({
	args: {
		storyId: v.id("stories"),
		type: v.union(
			v.literal("upvote"),
			v.literal("downvote"),
			v.literal("fake"),
			v.literal("verified"),
			v.literal("rip"),
		),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		const story = await ctx.db.get(args.storyId);
		if (!story) throw new Error("Story not found");

		// Check for existing vote
		const existingVote = await ctx.db
			.query("votes")
			.withIndex("by_user_story", (q) => q.eq("userId", userId).eq("storyId", args.storyId))
			.first();

		if (existingVote) {
			if (existingVote.type === args.type) {
				// Same vote = remove it
				await ctx.db.delete(existingVote._id);
				await updateStoryVoteCounts(ctx, args.storyId, existingVote.type, -1);
				return { action: "removed" };
			}
			// Different vote = change it
			const oldType = existingVote.type;
			await ctx.db.patch(existingVote._id, { type: args.type, createdAt: Date.now() });
			await updateStoryVoteCounts(ctx, args.storyId, oldType, -1);
			await updateStoryVoteCounts(ctx, args.storyId, args.type, 1);
			return { action: "changed" };
		}

		// New vote
		await ctx.db.insert("votes", {
			userId,
			storyId: args.storyId,
			type: args.type,
			createdAt: Date.now(),
		});
		await updateStoryVoteCounts(ctx, args.storyId, args.type, 1);
		return { action: "cast" };
	},
});

export const getUserVote = query({
	args: { storyId: v.id("stories") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return null;

		const vote = await ctx.db
			.query("votes")
			.withIndex("by_user_story", (q) => q.eq("userId", userId).eq("storyId", args.storyId))
			.first();

		return vote?.type ?? null;
	},
});

async function updateStoryVoteCounts(
	ctx: any,
	storyId: any,
	voteType: (typeof VOTE_TYPES)[number],
	delta: number,
) {
	const story = await ctx.db.get(storyId);
	if (!story) return;

	const updates: Record<string, number> = {};

	switch (voteType) {
		case "upvote":
			updates.upvotes = (story.upvotes ?? 0) + delta;
			break;
		case "downvote":
			updates.downvotes = (story.downvotes ?? 0) + delta;
			break;
		case "fake":
			updates.fakeFlags = (story.fakeFlags ?? 0) + delta;
			break;
		case "verified":
			updates.verifiedFlags = (story.verifiedFlags ?? 0) + delta;
			break;
		case "rip":
			updates.ripVotes = (story.ripVotes ?? 0) + delta;
			break;
	}

	updates.totalVotes = (story.totalVotes ?? 0) + delta;

	// Recalculate horror score
	const updatedStory = { ...story, ...updates };
	const receipts = await ctx.db
		.query("receipts")
		.withIndex("by_story", (q: any) => q.eq("storyId", storyId))
		.collect();

	const hasExternalLinks = receipts.some((r: any) => r.type === "link");

	updates.horrorScore = calculateHorrorScore({
		upvotes: updatedStory.upvotes,
		downvotes: updatedStory.downvotes,
		ripVotes: updatedStory.ripVotes,
		fakeFlags: updatedStory.fakeFlags,
		verifiedFlags: updatedStory.verifiedFlags,
		receiptCount: receipts.length,
		hasExternalLinks,
		communitySeverity: updatedStory.communitySeverity,
		createdAt: updatedStory.createdAt,
	});

	await ctx.db.patch(storyId, updates);
}
