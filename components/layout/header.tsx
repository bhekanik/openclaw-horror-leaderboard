"use client";

import { Menu, Skull } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
	{ href: "/", label: "Leaderboard" },
	{ href: "/submit", label: "Submit" },
	{ href: "/about", label: "About" },
];

export function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 header-glow">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<Skull className="h-7 w-7 text-primary drop-shadow-[0_0_8px_oklch(0.72_0.17_55_/_40%)]" />
						<div className="flex flex-col">
							<span className="text-lg font-bold leading-tight font-display">OpenClaw Horror</span>
							<span className="text-xs text-muted-foreground leading-tight hidden sm:block">
								The worst things OpenClaw has done to real people
							</span>
						</div>
					</Link>
				</div>

				{/* Desktop nav */}
				<nav className="hidden sm:flex items-center gap-4">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							{link.label}
						</Link>
					))}
					<AuthButton />
				</nav>

				{/* Mobile nav */}
				<div className="flex sm:hidden items-center gap-2">
					<AuthButton />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="Open menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-64 pt-12">
							<nav className="flex flex-col gap-4">
								{NAV_LINKS.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setOpen(false)}
										className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
