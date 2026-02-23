"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import Link from "next/link";
import { StoryForm } from "@/components/stories/story-form";
import { Button } from "@/components/ui/button";

export default function SubmitPage() {
	return (
		<div className="max-w-2xl mx-auto">
			<AuthLoading>
				<div className="space-y-4 animate-pulse">
					<div className="h-8 bg-muted rounded w-1/2" />
					<div className="h-64 bg-muted rounded" />
				</div>
			</AuthLoading>
			<Unauthenticated>
				<div className="text-center space-y-4 py-12">
					<h1 className="text-3xl font-bold font-display">Sign In Required</h1>
					<p className="text-muted-foreground">You need to be signed in to submit a story.</p>
					<Button asChild>
						<Link href="/auth/login">Sign In</Link>
					</Button>
				</div>
			</Unauthenticated>
			<Authenticated>
				<StoryForm />
			</Authenticated>
		</div>
	);
}
