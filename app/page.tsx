import { LeaderboardView } from "@/components/leaderboard/leaderboard-view";

export default function Home() {
	return (
		<div className="space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold tracking-tight">Horror Leaderboard</h1>
				<p className="text-muted-foreground">
					The most horrifying OpenClaw incidents, ranked by the community
				</p>
			</div>
			<LeaderboardView />
		</div>
	);
}
