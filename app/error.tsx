"use client";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="text-center py-20 space-y-6">
			<h2 className="text-3xl font-bold">Something went wrong</h2>
			<p className="text-muted-foreground">An unexpected error occurred. This has been logged.</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
