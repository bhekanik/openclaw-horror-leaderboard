"use client";

import { useQuery } from "convex/react";
import { MessageSquare } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";

interface CommentThreadProps {
	storyId: any;
}

export function CommentThread({ storyId }: CommentThreadProps) {
	const comments = useQuery(api.comments.getByStory, { storyId });

	if (comments === undefined) {
		return (
			<div className="text-center py-4 text-muted-foreground">
				<p>Loading comments...</p>
			</div>
		);
	}

	const totalCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0);

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<MessageSquare className="h-5 w-5" />
				<h2 className="text-lg font-semibold font-display">
					{totalCount} {totalCount === 1 ? "Comment" : "Comments"}
				</h2>
			</div>

			<CommentForm storyId={storyId} />

			{comments.length === 0 ? (
				<p className="text-center text-muted-foreground py-4">
					No comments yet. Be the first to share your thoughts.
				</p>
			) : (
				<div className="space-y-4">
					{comments.map((comment) => (
						<CommentItem key={comment._id} comment={comment} storyId={storyId} />
					))}
				</div>
			)}
		</div>
	);
}
