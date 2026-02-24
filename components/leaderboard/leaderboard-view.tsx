"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useConvexAuth } from "convex/react";
import { usePaginatedQuery } from "convex/react";
import { Ghost, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import {
	LeaderboardFilters,
	useLeaderboardFilters,
} from "@/components/leaderboard/leaderboard-filters";
import { StoryCard } from "@/components/stories/story-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";

const PAGE_SIZE = 20;

interface LeaderboardViewProps {
	category?: string;
}

export function LeaderboardView({ category: fixedCategory }: LeaderboardViewProps = {}) {
	const { isAuthenticated } = useConvexAuth();
	const [filters] = useLeaderboardFilters();

	const categoryFilter = fixedCategory
		? [fixedCategory]
		: filters.category.length > 0
			? filters.category
			: undefined;

	const { results, status, loadMore } = usePaginatedQuery(
		api.stories.listPaginated,
		{
			timeRange: filters.time,
			category: categoryFilter,
			sortBy: filters.sort,
		},
		{ initialNumItems: PAGE_SIZE },
	);

	const scrollRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: results.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => 200,
		overscan: 5,
		measureElement: (el) => el.getBoundingClientRect().height,
	});

	// Infinite scroll sentinel
	const sentinelRef = useRef<HTMLDivElement>(null);
	const loadMoreRef = useRef(loadMore);
	loadMoreRef.current = loadMore;

	const handleIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (entries[0]?.isIntersecting && status === "CanLoadMore") {
				loadMoreRef.current(PAGE_SIZE);
			}
		},
		[status],
	);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		const container = scrollRef.current;
		if (!sentinel || !container) return;

		const observer = new IntersectionObserver(handleIntersect, {
			root: container,
			rootMargin: "200px",
		});
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [handleIntersect]);

	const isLoading = status === "LoadingFirstPage";

	return (
		<div className="flex flex-col flex-1 min-h-0 gap-4">
			{/* Fixed filter bar */}
			<div className="shrink-0">
				<LeaderboardFilters />
			</div>

			{/* Scrollable story feed */}
			{isLoading ? (
				<div className="space-y-3 px-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-24 w-full" />
					))}
				</div>
			) : results.length === 0 ? (
				<div className="text-center py-16 space-y-4">
					<Ghost className="h-12 w-12 mx-auto text-muted-foreground/50" />
					<p className="text-lg text-muted-foreground">No stories found.</p>
					<Button asChild variant="outline">
						<Link href="/submit">Be the first to submit one</Link>
					</Button>
				</div>
			) : (
				<div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 px-1">
					<div
						style={{
							height: `${virtualizer.getTotalSize()}px`,
							width: "100%",
							position: "relative",
						}}
					>
						{virtualizer.getVirtualItems().map((virtualRow) => {
							const story = results[virtualRow.index];
							return (
								<div
									key={story._id}
									data-index={virtualRow.index}
									ref={virtualizer.measureElement}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										transform: `translateY(${virtualRow.start}px)`,
									}}
								>
									<div className="pb-3">
										<StoryCard
											story={story}
											rank={virtualRow.index + 1}
											isAuthenticated={isAuthenticated}
										/>
									</div>
								</div>
							);
						})}
					</div>

					{/* Sentinel for infinite scroll */}
					<div ref={sentinelRef} className="h-1" />

					{/* Loading indicator */}
					{status === "LoadingMore" && (
						<div className="flex justify-center py-4">
							<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
						</div>
					)}
				</div>
			)}
		</div>
	);
}
