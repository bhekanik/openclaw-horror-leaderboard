"use client";

import { useQuery } from "convex/react";
import { UserProfile } from "@/components/profile/user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";

export default function UserPage({ params }: { params: { username: string } }) {
	const user = useQuery(api.users.getByUsername, { username: params.username });
	const stories = useQuery(api.stories.listByAuthor, user ? { authorId: user._id } : "skip");

	if (user === undefined) {
		return (
			<div data-testid="profile-loading" className="max-w-3xl mx-auto space-y-6">
				<div className="flex items-center gap-4">
					<Skeleton className="h-16 w-16 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-6 w-40" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<Skeleton className="h-20" />
					<Skeleton className="h-20" />
					<Skeleton className="h-20" />
				</div>
			</div>
		);
	}

	if (user === null) {
		return (
			<div className="text-center py-12">
				<h1 className="text-3xl font-bold">User Not Found</h1>
				<p className="text-muted-foreground mt-2">This user doesn&apos;t exist.</p>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto">
			<UserProfile user={user} stories={stories ?? []} />
		</div>
	);
}
