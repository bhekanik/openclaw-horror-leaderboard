import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

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

describe("Home Page", () => {
	it("renders the leaderboard heading", () => {
		render(<Home />);
		expect(screen.getByRole("heading", { name: /horror leaderboard/i })).toBeInTheDocument();
	});

	it("renders the leaderboard view", () => {
		render(<Home />);
		expect(screen.getByText(/no stories yet/i)).toBeInTheDocument();
	});
});
