import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { LeaderboardFilters } from "./leaderboard-filters";

// Radix Select calls scrollIntoView which jsdom doesn't implement
beforeAll(() => {
	Element.prototype.scrollIntoView = vi.fn();
});

function renderFilters(searchParams?: Record<string, string>) {
	return render(
		<NuqsTestingAdapter searchParams={searchParams}>
			<LeaderboardFilters />
		</NuqsTestingAdapter>,
	);
}

describe("LeaderboardFilters", () => {
	it("renders sort and time selects", () => {
		renderFilters();
		const comboboxes = screen.getAllByRole("combobox");
		expect(comboboxes.length).toBe(2);
	});

	it("renders category toggle chips", () => {
		renderFilters();
		expect(screen.getByRole("group")).toBeInTheDocument();
	});

	it("renders all sort options in dropdown", async () => {
		const user = userEvent.setup();
		renderFilters();
		const comboboxes = screen.getAllByRole("combobox");
		// Sort select is the second combobox
		await user.click(comboboxes[1]);
		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(3);
		expect(options[0]).toHaveTextContent(/top scored/i);
		expect(options[1]).toHaveTextContent(/most recent/i);
		expect(options[2]).toHaveTextContent(/controversial/i);
	});
});
