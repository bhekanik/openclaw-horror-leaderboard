import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { LeaderboardFilters } from "./leaderboard-filters";

// Radix Select calls scrollIntoView which jsdom doesn't implement
beforeAll(() => {
	Element.prototype.scrollIntoView = vi.fn();
});

describe("LeaderboardFilters", () => {
	it("renders sort trigger", () => {
		render(<LeaderboardFilters sortBy="score" onSortChange={vi.fn()} />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("renders all sort options in dropdown", async () => {
		const user = userEvent.setup();
		render(<LeaderboardFilters sortBy="score" onSortChange={vi.fn()} />);
		await user.click(screen.getByRole("combobox"));
		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(3);
		expect(options[0]).toHaveTextContent(/top scored/i);
		expect(options[1]).toHaveTextContent(/most recent/i);
		expect(options[2]).toHaveTextContent(/controversial/i);
	});

	it("calls onSortChange when option selected", async () => {
		const onSortChange = vi.fn();
		const user = userEvent.setup();
		render(<LeaderboardFilters sortBy="score" onSortChange={onSortChange} />);
		await user.click(screen.getByRole("combobox"));
		const options = screen.getAllByRole("option");
		await user.click(options[1]); // "Most Recent"
		expect(onSortChange).toHaveBeenCalledWith("recent");
	});
});
