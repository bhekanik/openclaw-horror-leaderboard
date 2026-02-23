"use client";

import { StoryCard } from "@/components/stories/story-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const BADGE_MAP: Record<string, { label: string; emoji: string }> = {
	survivor: { label: "Survivor", emoji: "\u{1F3C6}" },
	witness: { label: "Witness", emoji: "\u{1F441}" },
	skeptic: { label: "Skeptic", emoji: "\u{1F9D0}" },
};

interface UserProfileProps {
	user: {
		_id: string;
		username?: string;
		displayName?: string;
		karma: number;
		storiesCount: number;
		totalHorrorScore: number;
		badges: string[];
		_creationTime: number;
	};
	stories: any[];
}

export function UserProfile({ user, stories }: UserProfileProps) {
	const joinDate = new Date(user._creationTime).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<div className="space-y-8">
			{/* Profile Header */}
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
						{(user.username ?? "?")[0].toUpperCase()}
					</div>
					<div>
						<h1 className="text-2xl font-bold">{user.username ?? "Anonymous"}</h1>
						{user.displayName && <p className="text-muted-foreground">{user.displayName}</p>}
						<p className="text-sm text-muted-foreground">Joined {joinDate}</p>
					</div>
				</div>

				{/* Badges */}
				{user.badges.length > 0 && (
					<div className="flex gap-2">
						{user.badges.map((badge) => {
							const info = BADGE_MAP[badge];
							return (
								<Badge key={badge} variant="secondary">
									{info ? `${info.emoji} ${info.label}` : badge}
								</Badge>
							);
						})}
					</div>
				)}
			</div>

			{/* Stats */}
			<div className="grid grid-cols-3 gap-4">
				<Card>
					<CardContent className="text-center py-4">
						<div className="text-2xl font-bold">{user.karma}</div>
						<div className="text-sm text-muted-foreground">Karma</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="text-center py-4">
						<div className="text-2xl font-bold">{user.storiesCount}</div>
						<div className="text-sm text-muted-foreground">Stories</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="text-center py-4">
						<div className="text-2xl font-bold">{user.totalHorrorScore.toFixed(1)}</div>
						<div className="text-sm text-muted-foreground">Horror Score</div>
					</CardContent>
				</Card>
			</div>

			{/* Stories */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Submitted Stories</h2>
				{stories.length === 0 ? (
					<p className="text-muted-foreground text-center py-4">No stories submitted yet.</p>
				) : (
					<div className="space-y-3">
						{stories.map((story) => (
							<StoryCard key={story._id} story={story} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
