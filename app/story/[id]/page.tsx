"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { CommentThread } from "@/components/comments/comment-thread";
import { StoryDetail } from "@/components/stories/story-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export default function StoryPage() {
	const params = useParams();
	const storyId = params.id as Id<"stories">;

	const story = useQuery(api.stories.getById, { id: storyId });
	const receipts = useQuery(api.receipts.getByStory, story ? { storyId: story._id } : "skip");
	const author = useQuery(api.users.currentUser); // TODO: query by authorId

	if (story === undefined) {
		return (
			<div className="max-w-3xl mx-auto space-y-6">
				<Skeleton className="h-8 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (story === null) {
		return (
			<div className="text-center py-12">
				<h1 className="text-3xl font-bold">Story Not Found</h1>
				<p className="text-muted-foreground mt-2">
					This story doesn&apos;t exist or has been removed.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto space-y-8">
			<StoryDetail story={story} receipts={receipts ?? []} author={author ?? null} />
			<hr className="border-border" />
			<CommentThread storyId={story._id} />
		</div>
	);
}
