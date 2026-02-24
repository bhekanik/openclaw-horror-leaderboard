"use client";

import { Suspense } from "react";
import { CATEGORY_MAP } from "@/lib/constants";
import { LeaderboardView } from "@/components/leaderboard/leaderboard-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const cat = CATEGORY_MAP[slug];
	const Icon = cat?.icon;

	return (
		<div className="flex flex-col flex-1 min-h-0 container mx-auto px-4">
			<div className="text-center py-6 space-y-2 animate-fade-in-up shrink-0">
				<h1 className="text-4xl font-bold tracking-tight font-display flex items-center justify-center gap-3">
					{Icon && <Icon className="h-8 w-8" />}
					{cat ? cat.label : slug}
				</h1>
				{cat && (
					<p className="text-muted-foreground">Stories in the &ldquo;{cat.label}&rdquo; category</p>
				)}
			</div>
			<Suspense
				fallback={
					<div className="space-y-3 px-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton key={i} className="h-24 w-full" />
						))}
					</div>
				}
			>
				<LeaderboardView category={slug} />
			</Suspense>
		</div>
	);
}
