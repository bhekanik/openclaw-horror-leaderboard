"use client";

import { CATEGORY_MAP } from "@/lib/constants";
import { LeaderboardView } from "@/components/leaderboard/leaderboard-view";

export default function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const cat = CATEGORY_MAP[slug];
	const Icon = cat?.icon;

	return (
		<div className="space-y-8">
			<div className="text-center space-y-2 animate-fade-in-up">
				<h1 className="text-4xl font-bold tracking-tight font-display flex items-center justify-center gap-3">
					{Icon && <Icon className="h-8 w-8" />}
					{cat ? cat.label : slug}
				</h1>
				{cat && (
					<p className="text-muted-foreground">
						Stories in the &ldquo;{cat.label}&rdquo; category
					</p>
				)}
			</div>
			<LeaderboardView category={slug} />
		</div>
	);
}
