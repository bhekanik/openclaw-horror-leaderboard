"use client";

import { LeaderboardView } from "@/components/leaderboard/leaderboard-view";

const CATEGORY_MAP: Record<string, { label: string; emoji: string }> = {
	rogue: { label: "It went rogue", emoji: "\u{1F525}" },
	cost_money: { label: "It cost me money", emoji: "\u{1F4B8}" },
	scared_me: { label: "It scared me", emoji: "\u{1F631}" },
	security: { label: "Security nightmare", emoji: "\u{1F513}" },
	epic_fail: { label: "Epic fail", emoji: "\u{1F926}" },
	identity_crisis: { label: "Identity crisis", emoji: "\u{1F3AD}" },
	almost_catastrophic: { label: "Almost catastrophic", emoji: "\u{1F480}" },
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const cat = CATEGORY_MAP[slug];

	return (
		<div className="space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold tracking-tight">
					{cat ? `${cat.emoji} ${cat.label}` : slug}
				</h1>
				{cat && (
					<p className="text-muted-foreground">Stories in the &ldquo;{cat.label}&rdquo; category</p>
				)}
			</div>
			<LeaderboardView category={slug} />
		</div>
	);
}
