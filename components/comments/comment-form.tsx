"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

interface CommentFormProps {
	storyId: any;
	parentId?: any;
	onSubmitted?: () => void;
}

export function CommentForm({ storyId, parentId, onSubmitted }: CommentFormProps) {
	const [body, setBody] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const createComment = useMutation(api.comments.create);

	const isReply = !!parentId;
	const placeholder = isReply ? "Write a reply..." : "Add a comment...";
	const buttonLabel = isReply ? "Reply" : "Comment";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!body.trim()) return;

		setIsSubmitting(true);
		try {
			await createComment({
				storyId,
				body: body.trim(),
				...(parentId ? { parentId } : {}),
			});
			setBody("");
			onSubmitted?.();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder={placeholder}
				maxLength={2000}
				rows={isReply ? 2 : 3}
				className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
			/>
			<div className="flex justify-end">
				<Button type="submit" size="sm" disabled={!body.trim() || isSubmitting}>
					{buttonLabel}
				</Button>
			</div>
		</form>
	);
}
