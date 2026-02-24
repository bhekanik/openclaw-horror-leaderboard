"use client";

import { BADGE_MAP } from "@/lib/constants";
import { StoryCard } from "@/components/stories/story-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
			<div className="space-y-4 animate-fade-in-up">
				<div className="flex items-center gap-4">
					<div className="h-16 w-16 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center text-2xl font-bold text-primary font-display">
						{(user.username ?? "?")[0].toUpperCase()}
					</div>
					<div>
						<h1 className="text-2xl font-bold font-display">{user.username ?? "Anonymous"}</h1>
						{user.displayName && <p className="text-muted-foreground">{user.displayName}</p>}
						<p className="text-sm text-muted-foreground">Joined {joinDate}</p>
					</div>
				</div>

				{/* Badges */}
				{user.badges.length > 0 && (
					<div className="flex gap-2">
						{user.badges.map((badge) => {
							const info = BADGE_MAP[badge];
							if (!info)
								return (
									<Badge key={badge} variant="secondary">
										{badge}
									</Badge>
								);
							const Icon = info.icon;
							return (
								<Badge key={badge} variant="secondary" className="gap-1">
									<Icon className="h-3 w-3" />
									{info.label}
								</Badge>
							);
						})}
					</div>
				)}
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{[
					{ value: user.karma, label: "Karma" },
					{ value: user.storiesCount, label: "Stories" },
					{ value: user.totalHorrorScore.toFixed(1), label: "Horror Score" },
				].map((stat, i) => (
					<Card
						key={stat.label}
						className="animate-card-enter"
						style={{ animationDelay: `${i * 80}ms` }}
					>
						<CardContent className="text-center py-4">
							<div className="text-2xl font-bold font-display">{stat.value}</div>
							<div className="text-sm text-muted-foreground">{stat.label}</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Stories */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold font-display">Submitted Stories</h2>
				{stories.length === 0 ? (
					<p className="text-muted-foreground text-center py-4">No stories submitted yet.</p>
				) : (
					<div className="space-y-3">
						{stories.map((story, i) => (
							<StoryCard key={story._id} story={story} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
