"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { LeaderboardFilters, type SortBy } from "@/components/leaderboard/leaderboard-filters";
import { StoryCard } from "@/components/stories/story-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";

type TimeRange = "all" | "week" | "month";

interface LeaderboardViewProps {
	category?: string;
}

export function LeaderboardView({ category }: LeaderboardViewProps) {
	const [timeRange, setTimeRange] = useState<TimeRange>("all");
	const [sortBy, setSortBy] = useState<SortBy>("score");
	const stories = useQuery(api.stories.list, { timeRange, category, sortBy });

	if (stories === undefined) {
		return (
			<div data-testid="leaderboard-loading" className="space-y-4">
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
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
				<div className="text-center py-12 text-muted-foreground">
					<p>No stories yet. Be the first to submit one.</p>
				</div>
			) : (
				<div className="space-y-3">
					{stories.map((story) => (
						<StoryCard key={story._id} story={story} />
					))}
				</div>
			)}
		</div>
	);
}
