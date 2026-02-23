import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./page";

vi.mock("convex/react", () => ({
	useQuery: () => [],
	useMutation: () => vi.fn(),
	useConvexAuth: () => ({ isAuthenticated: false, isLoading: false }),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { list: "stories:list" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

describe("Home Page", () => {
	it("renders the leaderboard heading", () => {
		render(<TooltipProvider><Home /></TooltipProvider>);
		expect(screen.getByRole("heading", { name: /horror leaderboard/i })).toBeInTheDocument();
	});

	it("renders the leaderboard view", () => {
		render(<TooltipProvider><Home /></TooltipProvider>);
		expect(screen.getByText(/no stories yet/i)).toBeInTheDocument();
	});
});
