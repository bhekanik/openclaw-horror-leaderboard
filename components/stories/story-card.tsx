"use client";

import { ArrowBigUp, FileCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORY_MAP: Record<string, { label: string; emoji: string }> = {
	rogue: { label: "It went rogue", emoji: "\u{1F525}" },
	cost_money: { label: "It cost me money", emoji: "\u{1F4B8}" },
	scared_me: { label: "It scared me", emoji: "\u{1F631}" },
	security: { label: "Security nightmare", emoji: "\u{1F513}" },
	epic_fail: { label: "Epic fail", emoji: "\u{1F926}" },
	identity_crisis: { label: "Identity crisis", emoji: "\u{1F3AD}" },
	almost_catastrophic: { label: "Almost catastrophic", emoji: "\u{1F480}" },
};

interface StoryCardProps {
	story: {
		_id: any;
		title: string;
		category: string;
		severity: number;
		horrorScore: number;
		upvotes: number;
		downvotes: number;
		ripVotes: number;
		totalVotes: number;
		receiptIds: any[];
		createdAt: number;
		authorUsername?: string;
		tags: string[];
	};
}

export function StoryCard({ story }: StoryCardProps) {
	const cat = CATEGORY_MAP[story.category];
	const scoreDisplay = story.horrorScore.toFixed(2);
	const timeAgo = formatTimeAgo(story.createdAt);

	return (
		<Card className="hover:border-primary/30 transition-colors">
			<CardContent className="flex gap-4 py-4">
				{/* Score */}
				<div className="flex flex-col items-center justify-center min-w-[60px]">
					<span className="text-2xl font-bold text-primary">{scoreDisplay}</span>
					<span className="text-xs text-muted-foreground">score</span>
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0 space-y-2">
					<div className="flex items-start gap-2">
						<Link
							href={`/story/${story._id}`}
							className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
						>
							{story.title}
						</Link>
					</div>

					<div className="flex items-center gap-2 flex-wrap text-sm">
						{cat && (
							<Badge variant="secondary" className="text-xs">
								{cat.emoji} {cat.label}
							</Badge>
						)}
						<span className="flex items-center gap-1 text-muted-foreground">
							<ArrowBigUp className="h-3 w-3" />
							{story.upvotes}
						</span>
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
				</div>
			</CardContent>
		</Card>
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
