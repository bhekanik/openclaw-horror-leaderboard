import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="text-center py-20 space-y-6">
			<h1 className="text-6xl font-bold">404</h1>
			<p className="text-2xl text-muted-foreground">Looks like OpenClaw deleted this page too.</p>
			<p className="text-muted-foreground">
				The page you&apos;re looking for doesn&apos;t exist or has been removed.
			</p>
			<Button asChild>
				<Link href="/">Back to the Leaderboard</Link>
			</Button>
		</div>
	);
}
