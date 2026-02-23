"use client";

import { useMutation, useQuery } from "convex/react";
import { ArrowBigDown, ArrowBigUp, CheckCircle, Flag, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type VoteType = "upvote" | "downvote" | "fake" | "verified" | "rip";

interface VoteButtonsProps {
	storyId: Id<"stories">;
	upvotes: number;
	downvotes: number;
	fakeFlags: number;
	verifiedFlags: number;
	ripVotes: number;
	isAuthenticated: boolean;
}

const VOTE_CONFIG: {
	type: VoteType;
	label: string;
	icon: typeof ArrowBigUp;
	countKey: keyof VoteButtonsProps;
	activeClass: string;
}[] = [
	{
		type: "upvote",
		label: "Upvote",
		icon: ArrowBigUp,
		countKey: "upvotes",
		activeClass: "text-primary bg-primary/10 border-primary/30",
	},
	{
		type: "downvote",
		label: "Downvote",
		icon: ArrowBigDown,
		countKey: "downvotes",
		activeClass: "text-destructive bg-destructive/10 border-destructive/30",
	},
	{
		type: "fake",
		label: "Flag as Fake",
		icon: Flag,
		countKey: "fakeFlags",
		activeClass: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
	},
	{
		type: "verified",
		label: "Verified",
		icon: CheckCircle,
		countKey: "verifiedFlags",
		activeClass: "text-green-500 bg-green-500/10 border-green-500/30",
	},
	{
		type: "rip",
		label: "RIP",
		icon: Skull,
		countKey: "ripVotes",
		activeClass: "text-muted-foreground bg-muted border-muted-foreground/30",
	},
];

export function VoteButtons({
	storyId,
	upvotes,
	downvotes,
	fakeFlags,
	verifiedFlags,
	ripVotes,
	isAuthenticated,
}: VoteButtonsProps) {
	const castVote = useMutation(api.votes.cast);
	const userVote = useQuery(api.votes.getUserVote, { storyId });

	const counts: Record<string, number> = {
		upvotes,
		downvotes,
		fakeFlags,
		verifiedFlags,
		ripVotes,
	};

	async function handleVote(type: VoteType) {
		if (!isAuthenticated) return;
		try {
			await castVote({ storyId, type });
		} catch {
			// TODO: show toast
		}
	}

	return (
		<div className="flex items-center gap-1 flex-wrap">
			{VOTE_CONFIG.map(({ type, label, icon: Icon, countKey, activeClass }) => {
				const isActive = userVote === type;
				const count = counts[countKey as string] ?? 0;

				return (
					<Tooltip key={type}>
						<TooltipTrigger asChild>
							<Button
								variant={isActive ? "outline" : "ghost"}
								size="sm"
								className={`gap-1 min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 active:scale-95 transition-all ${
									isActive ? activeClass : ""
								}`}
								disabled={!isAuthenticated}
								data-active={isActive ? "true" : "false"}
								onClick={() => handleVote(type)}
								aria-label={label}
							>
								<Icon className="h-4 w-4" />
								{count > 0 && <span className="text-xs">{count}</span>}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{label}</p>
						</TooltipContent>
					</Tooltip>
				);
			})}
		</div>
	);
}
