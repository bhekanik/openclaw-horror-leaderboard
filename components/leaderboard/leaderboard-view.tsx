"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LeaderboardFilters, type SortBy } from "@/components/leaderboard/leaderboard-filters";
import { StoryCard } from "@/components/stories/story-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";

type TimeRange = "all" | "week" | "month";

interface LeaderboardViewProps {
	category?: string;
}

export function LeaderboardView({ category }: LeaderboardViewProps) {
	const { isAuthenticated } = useConvexAuth();
	const [timeRange, setTimeRange] = useState<TimeRange>("all");
	const [sortBy, setSortBy] = useState<SortBy>("score");
	const stories = useQuery(api.stories.list, { timeRange, category, sortBy });

	if (stories === undefined) {
		return (
			<div data-testid="leaderboard-loading" className="space-y-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton
						key={i}
						className="h-24 w-full animate-card-enter"
						style={{ animationDelay: `${i * 80}ms` }}
					/>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between gap-4 flex-wrap">
				<Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
					<TabsList>
						<TabsTrigger value="all">All Time</TabsTrigger>
						<TabsTrigger value="week">This Week</TabsTrigger>
						<TabsTrigger value="month">This Month</TabsTrigger>
					</TabsList>
				</Tabs>
				<LeaderboardFilters sortBy={sortBy} onSortChange={setSortBy} />
			</div>

			{stories.length === 0 ? (
				<div className="text-center py-16 space-y-4 animate-fade-in-up">
					<Ghost className="h-12 w-12 mx-auto text-muted-foreground/50" />
					<p className="text-lg text-muted-foreground">No stories yet.</p>
					<Button asChild variant="outline">
						<Link href="/submit">Be the first to submit one</Link>
					</Button>
				</div>
			) : (
				<div className="space-y-3">
					{stories.map((story, i) => (
						<StoryCard key={story._id} story={story} rank={i + 1} index={i} isAuthenticated={isAuthenticated} />
					))}
				</div>
			)}
		</div>
	);
}
