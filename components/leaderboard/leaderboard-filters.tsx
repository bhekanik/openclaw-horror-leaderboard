"use client";

import { ArrowUpDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type SortBy = "score" | "recent" | "controversial";

interface LeaderboardFiltersProps {
	sortBy: SortBy;
	onSortChange: (sort: SortBy) => void;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
	{ value: "score", label: "Top Scored" },
	{ value: "recent", label: "Most Recent" },
	{ value: "controversial", label: "Controversial" },
];

export function LeaderboardFilters({ sortBy, onSortChange }: LeaderboardFiltersProps) {
	return (
		<Select value={sortBy} onValueChange={(v) => onSortChange(v as SortBy)}>
			<SelectTrigger className="w-[160px]">
				<ArrowUpDown className="h-3.5 w-3.5 shrink-0" />
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SORT_OPTIONS.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						{opt.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
