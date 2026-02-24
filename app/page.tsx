import { Suspense } from "react";
import { LeaderboardView } from "@/components/leaderboard/leaderboard-view";
import { Skeleton } from "@/components/ui/skeleton";

function LeaderboardFallback() {
	return (
		<div className="space-y-3 px-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton key={i} className="h-24 w-full" />
			))}
		</div>
	);
}

export default function Home() {
	return (
		<div className="flex flex-col flex-1 min-h-0 container mx-auto px-4">
			<div className="text-center py-6 space-y-1 shrink-0">
				<h1 className="text-4xl font-bold tracking-tight font-display">Horror Leaderboard</h1>
				<p className="text-muted-foreground">
					The most horrifying OpenClaw incidents, ranked by the community
				</p>
			</div>
			<Suspense fallback={<LeaderboardFallback />}>
				<LeaderboardView />
			</Suspense>
		</div>
	);
}
