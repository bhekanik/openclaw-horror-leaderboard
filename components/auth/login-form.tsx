"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
	const { signIn } = useAuthActions();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget);
			formData.set("flow", "signIn");
			await signIn("password", formData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign in failed");
		} finally {
			setLoading(false);
		}
	}

	async function handleGitHub() {
		setError(null);
		try {
			await signIn("github", { redirectTo: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "GitHub sign in failed");
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Sign In</CardTitle>
				<CardDescription>Sign in to submit stories and vote</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Button type="button" variant="outline" className="w-full" onClick={handleGitHub}>
					<Github className="mr-2 h-4 w-4" />
					Sign in with GitHub
				</Button>

				<div className="flex items-center gap-2">
					<Separator className="flex-1" />
					<span className="text-xs text-muted-foreground">or</span>
					<Separator className="flex-1" />
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="login-email">Email</Label>
						<Input
							id="login-email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="login-password">Password</Label>
						<Input
							id="login-password"
							name="password"
							type="password"
							placeholder="Your password"
							required
						/>
					</div>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</Button>
				</form>

				<p className="text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link href="/auth/register" className="text-primary hover:underline">
						Sign up
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
