"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";

interface UsernameFormProps {
	onComplete: () => void;
}

export function UsernameForm({ onComplete }: UsernameFormProps) {
	const setUsername = useMutation(api.users.setUsername);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.currentTarget);
		const username = (formData.get("username") as string).trim();

		if (username.length < 3 || username.length > 20) {
			setError("Username must be 3-20 characters");
			return;
		}

		if (!/^[a-zA-Z0-9_]+$/.test(username)) {
			setError("Username can only contain letters, numbers, and underscores");
			return;
		}

		setLoading(true);
		try {
			await setUsername({ username });
			onComplete();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to set username");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Choose a Username</CardTitle>
				<CardDescription>
					Pick a pseudonym for the community. This will be publicly visible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							name="username"
							placeholder="your_username"
							maxLength={20}
							required
						/>
						<p className="text-xs text-muted-foreground">
							3-20 characters, letters, numbers, and underscores only
						</p>
					</div>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Setting username..." : "Set Username"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
