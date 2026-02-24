"use client";

import { ArrowUpDown, Clock, Timer } from "lucide-react";
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { CATEGORIES } from "@/lib/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SORT_VALUES = ["score", "recent", "controversial"] as const;
export const TIME_VALUES = ["all", "week", "month"] as const;

export type SortBy = (typeof SORT_VALUES)[number];
export type TimeRange = (typeof TIME_VALUES)[number];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
	{ value: "score", label: "Top Scored" },
	{ value: "recent", label: "Most Recent" },
	{ value: "controversial", label: "Controversial" },
];

const TIME_OPTIONS: { value: TimeRange; label: string; icon: typeof Clock }[] = [
	{ value: "all", label: "All Time", icon: Clock },
	{ value: "week", label: "This Week", icon: Timer },
	{ value: "month", label: "This Month", icon: Timer },
];

export const filterParsers = {
	category: parseAsArrayOf(parseAsString).withDefault([]),
	sort: parseAsStringLiteral(SORT_VALUES).withDefault("score"),
	time: parseAsStringLiteral(TIME_VALUES).withDefault("all"),
};

export function useLeaderboardFilters() {
	return useQueryStates(filterParsers, { shallow: true });
}

export function LeaderboardFilters() {
	const [filters, setFilters] = useLeaderboardFilters();

	return (
		<div className="space-y-3">
			{/* Category chips */}
			<ToggleGroup
				type="multiple"
				value={filters.category}
				onValueChange={(value) => setFilters({ category: value })}
				className="flex flex-wrap gap-1.5 justify-start"
			>
				{CATEGORIES.map((cat) => {
					const Icon = cat.icon;
					return (
						<ToggleGroupItem
							key={cat.value}
							value={cat.value}
							aria-label={cat.label}
							variant="outline"
							size="sm"
							className="gap-1.5 text-xs px-2.5 h-7"
						>
							<Icon className="h-3 w-3" />
							<span className="hidden sm:inline">{cat.label}</span>
						</ToggleGroupItem>
					);
				})}
			</ToggleGroup>

			{/* Sort + Time range */}
			<div className="flex items-center gap-2 flex-wrap">
				<Select value={filters.time} onValueChange={(v) => setFilters({ time: v as TimeRange })}>
					<SelectTrigger className="w-[140px] h-8 text-xs">
						<Clock className="h-3 w-3 shrink-0" />
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{TIME_OPTIONS.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={filters.sort} onValueChange={(v) => setFilters({ sort: v as SortBy })}>
					<SelectTrigger className="w-[150px] h-8 text-xs">
						<ArrowUpDown className="h-3 w-3 shrink-0" />
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
			</div>
		</div>
	);
}
