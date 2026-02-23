import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryPage from "./page";

vi.mock("convex/react", () => ({
	useQuery: () => [],
	useMutation: () => vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { list: "stories:list" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

describe("Category Page", () => {
	it("renders category heading with emoji and label", () => {
		render(<CategoryPage params={{ slug: "rogue" }} />);
		expect(screen.getByRole("heading", { name: /it went rogue/i })).toBeInTheDocument();
	});

	it("renders leaderboard filtered by category", () => {
		render(<CategoryPage params={{ slug: "security" }} />);
		expect(screen.getByText(/no stories yet/i)).toBeInTheDocument();
	});

	it("renders unknown category gracefully", () => {
		render(<CategoryPage params={{ slug: "nonexistent" }} />);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});
});
