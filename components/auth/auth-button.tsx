"use client";

import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { UserMenu } from "./user-menu";

function AuthenticatedContent() {
	const user = useQuery(api.users.currentUser);
	if (!user) return null;
	return <UserMenu user={user} />;
}

export function AuthButton() {
	return (
		<>
			<AuthLoading>
				<div className="h-9 w-16 animate-pulse rounded-md bg-muted" />
			</AuthLoading>
			<Unauthenticated>
				<Link
					href="/auth/login"
					className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
				>
					Login
				</Link>
			</Unauthenticated>
			<Authenticated>
				<AuthenticatedContent />
			</Authenticated>
		</>
	);
}
