import { Skull } from "lucide-react";
import Link from "next/link";
import { AuthButton } from "@/components/auth/auth-button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<Skull className="h-6 w-6 text-primary" />
						<div className="flex flex-col">
							<span className="text-lg font-bold leading-tight">OpenClaw Horror</span>
							<span className="text-xs text-muted-foreground leading-tight hidden sm:block">
								The worst things OpenClaw has done to real people
							</span>
						</div>
					</Link>
				</div>

				<nav className="flex items-center gap-4">
					<Link
						href="/"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Leaderboard
					</Link>
					<Link
						href="/submit"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Submit
					</Link>
					<Link
						href="/about"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						About
					</Link>
					<AuthButton />
				</nav>
			</div>
		</header>
	);
}
