"use client";

import { FileCheck } from "lucide-react";
import Link from "next/link";
import { CATEGORY_MAP } from "@/lib/constants";
import { formatTimeAgo } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VoteButtons } from "./vote-buttons";

interface StoryCardProps {
	story: {
		_id: any;
		title: string;
		category: string;
		severity: number;
		horrorScore: number;
		upvotes: number;
		downvotes: number;
		fakeFlags: number;
		verifiedFlags: number;
		ripVotes: number;
		totalVotes: number;
		receiptIds: any[];
		createdAt: number;
		authorUsername?: string;
		tags: string[];
	};
	rank?: number;
	isAuthenticated?: boolean;
}

export function StoryCard({ story, rank, isAuthenticated = false }: StoryCardProps) {
	const cat = CATEGORY_MAP[story.category];
	const scoreDisplay = story.horrorScore.toFixed(2);
	const timeAgo = formatTimeAgo(story.createdAt);
	const Icon = cat?.icon;

	return (
		<Card className="transition-colors duration-200">
			<CardContent className="flex gap-4 py-4">
				{/* Score */}
				<div className="flex flex-col items-center justify-center min-w-[52px] sm:min-w-[60px] bg-primary/5 rounded-lg px-2 py-1">
					{rank !== undefined && (
						<span className="text-[10px] text-muted-foreground font-medium">#{rank}</span>
					)}
					<span className="text-2xl font-bold text-primary font-display">{scoreDisplay}</span>
					<span className="text-xs text-muted-foreground">score</span>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0 space-y-2">
					<div className="flex items-start gap-2">
						<Link
							href={`/story/${story._id}`}
							className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2 font-display"
						>
							{story.title}
						</Link>
					</div>

					<div className="flex items-center gap-2 flex-wrap text-sm">
						{cat && (
							<Badge variant="secondary" className="text-xs gap-1">
								{Icon && <Icon className="h-3 w-3" />}
								{cat.label}
							</Badge>
						)}
						<span className="flex items-center gap-1 text-muted-foreground">
							<FileCheck className="h-3 w-3" />
							{story.receiptIds.length} receipts
						</span>
						{story.authorUsername && (
							<span className="text-muted-foreground">
								by{" "}
								<Link
									href={`/user/${story.authorUsername}`}
									className="text-primary hover:underline"
								>
									{story.authorUsername}
								</Link>
							</span>
						)}
						<span className="text-muted-foreground">{timeAgo}</span>
					</div>

					<VoteButtons
						storyId={story._id}
						upvotes={story.upvotes}
						downvotes={story.downvotes}
						fakeFlags={story.fakeFlags}
						verifiedFlags={story.verifiedFlags}
						ripVotes={story.ripVotes}
						isAuthenticated={isAuthenticated}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
