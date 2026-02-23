"use client";

import { useMutation } from "convex/react";
import { ArrowBigDown, ArrowBigUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { CommentForm } from "./comment-form";

interface CommentData {
	_id: any;
	storyId: any;
	authorId: any;
	parentId?: any;
	body: string;
	authorUsername: string;
	upvotes: number;
	downvotes: number;
	isRemoved: boolean;
	createdAt: number;
	replies: CommentData[];
}

interface CommentItemProps {
	comment: CommentData;
	storyId: any;
	depth?: number;
	userVote?: string;
}

const MAX_DEPTH = 1;

export function CommentItem({ comment, storyId, depth = 0, userVote }: CommentItemProps) {
	const [showReplyForm, setShowReplyForm] = useState(false);
	const castVote = useMutation(api.commentVotes.cast);
	const timeAgo = formatTimeAgo(comment.createdAt);
	const score = comment.upvotes - comment.downvotes;

	return (
		<div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
			<div className="space-y-1">
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span className="font-medium text-foreground">{comment.authorUsername}</span>
					<span>{timeAgo}</span>
				</div>
				<p className="text-sm">{comment.body}</p>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						className="h-6 px-1"
						onClick={() => castVote({ commentId: comment._id, type: "upvote" })}
					>
						<ArrowBigUp
							className={`h-4 w-4 ${userVote === "upvote" ? "text-primary fill-primary" : ""}`}
						/>
					</Button>
					<span className="text-xs font-medium">{comment.upvotes}</span>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 px-1"
						onClick={() => castVote({ commentId: comment._id, type: "downvote" })}
					>
						<ArrowBigDown
							className={`h-4 w-4 ${userVote === "downvote" ? "text-destructive fill-destructive" : ""}`}
						/>
					</Button>
					{depth < MAX_DEPTH && (
						<Button
							variant="ghost"
							size="sm"
							className="h-6 px-2 text-xs"
							onClick={() => setShowReplyForm(!showReplyForm)}
						>
							<MessageSquare className="h-3 w-3 mr-1" />
							Reply
						</Button>
					)}
				</div>
			</div>

			{showReplyForm && (
				<div className="mt-2 ml-2">
					<CommentForm
						storyId={storyId}
						parentId={comment._id}
						onSubmitted={() => setShowReplyForm(false)}
					/>
				</div>
			)}

			{comment.replies.length > 0 && (
				<div className="mt-3 space-y-3">
					{comment.replies.map((reply) => (
						<CommentItem key={reply._id} comment={reply} storyId={storyId} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);
}

function formatTimeAgo(timestamp: number): string {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "just now";
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
	return new Date(timestamp).toLocaleDateString();
}
