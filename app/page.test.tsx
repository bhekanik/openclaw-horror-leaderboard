import { render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./page";

vi.mock("convex/react", () => ({
	usePaginatedQuery: () => ({
		results: [],
		status: "Exhausted",
		loadMore: vi.fn(),
	}),
	useMutation: () => vi.fn(),
	useConvexAuth: () => ({ isAuthenticated: false, isLoading: false }),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { listPaginated: "stories:listPaginated" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

describe("Home Page", () => {
	it("renders the leaderboard heading", () => {
		render(
			<NuqsTestingAdapter>
				<TooltipProvider>
					<Home />
				</TooltipProvider>
			</NuqsTestingAdapter>,
		);
		expect(screen.getByRole("heading", { name: /horror leaderboard/i })).toBeInTheDocument();
	});

	it("renders the leaderboard view", () => {
		render(
			<NuqsTestingAdapter>
				<TooltipProvider>
					<Home />
				</TooltipProvider>
			</NuqsTestingAdapter>,
		);
		expect(screen.getByText(/no stories found/i)).toBeInTheDocument();
	});
});
