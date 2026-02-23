"use client";

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
		<div className="flex items-center gap-3">
			<select
				value={sortBy}
				onChange={(e) => onSortChange(e.target.value as SortBy)}
				className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				{SORT_OPTIONS.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
