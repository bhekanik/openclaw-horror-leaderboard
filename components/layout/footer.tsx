import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="container mx-auto flex flex-col items-center gap-2 px-4 py-6 text-center text-sm text-muted-foreground">
				<div className="flex gap-4">
					<Link href="/about" className="hover:text-foreground transition-colors">
						About
					</Link>
					<Link href="/" className="hover:text-foreground transition-colors">
						Leaderboard
					</Link>
				</div>
				<p>Not affiliated with OpenClaw, Peter Steinberger, or any related entity.</p>
				<p className="text-xs font-display">
					OpenClaw Horror Stories — community-driven accountability
				</p>
			</div>
		</footer>
	);
}
