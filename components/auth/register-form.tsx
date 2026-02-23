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

export function RegisterForm() {
	const { signIn } = useAuthActions();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.currentTarget);
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			formData.set("flow", "signUp");
			formData.delete("confirmPassword");
			await signIn("password", formData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed");
		} finally {
			setLoading(false);
		}
	}

	async function handleGitHub() {
		setError(null);
		try {
			await signIn("github", { redirectTo: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "GitHub sign up failed");
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Create Account</CardTitle>
				<CardDescription>Join the community. Pseudonymous accounts welcome.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Button type="button" variant="outline" className="w-full" onClick={handleGitHub}>
					<Github className="mr-2 h-4 w-4" />
					Sign up with GitHub
				</Button>

				<div className="flex items-center gap-2">
					<Separator className="flex-1" />
					<span className="text-xs text-muted-foreground">or</span>
					<Separator className="flex-1" />
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="register-email">Email</Label>
						<Input
							id="register-email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="register-password">Password</Label>
						<Input
							id="register-password"
							name="password"
							type="password"
							placeholder="Min 8 characters"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="register-confirm-password">Confirm Password</Label>
						<Input
							id="register-confirm-password"
							name="confirmPassword"
							type="password"
							placeholder="Repeat your password"
							required
						/>
					</div>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Creating account..." : "Sign Up"}
					</Button>
				</form>

				<p className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/auth/login" className="text-primary hover:underline">
						Sign in
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
