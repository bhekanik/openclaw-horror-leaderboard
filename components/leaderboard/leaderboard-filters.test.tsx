import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LeaderboardFilters } from "./leaderboard-filters";

describe("LeaderboardFilters", () => {
	it("renders sort options", () => {
		render(<LeaderboardFilters sortBy="score" onSortChange={vi.fn()} />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("renders all sort options in dropdown", async () => {
		const user = userEvent.setup();
		render(<LeaderboardFilters sortBy="score" onSortChange={vi.fn()} />);
		await user.click(screen.getByRole("combobox"));
		expect(screen.getByText(/top scored/i)).toBeInTheDocument();
		expect(screen.getByText(/most recent/i)).toBeInTheDocument();
		expect(screen.getByText(/controversial/i)).toBeInTheDocument();
	});

	it("calls onSortChange when option selected", async () => {
		const onSortChange = vi.fn();
		const user = userEvent.setup();
		render(<LeaderboardFilters sortBy="score" onSortChange={onSortChange} />);
		await user.selectOptions(screen.getByRole("combobox"), "recent");
		expect(onSortChange).toHaveBeenCalledWith("recent");
	});
});
