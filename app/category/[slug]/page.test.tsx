import { render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import CategoryPage from "./page";

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

describe("Category Page", () => {
	it("renders category heading with emoji and label", () => {
		render(
			<NuqsTestingAdapter>
				<TooltipProvider>
					<CategoryPage params={{ slug: "rogue" }} />
				</TooltipProvider>
			</NuqsTestingAdapter>,
		);
		expect(screen.getByRole("heading", { name: /it went rogue/i })).toBeInTheDocument();
	});

	it("renders leaderboard filtered by category", () => {
		render(
			<NuqsTestingAdapter>
				<TooltipProvider>
					<CategoryPage params={{ slug: "security" }} />
				</TooltipProvider>
			</NuqsTestingAdapter>,
		);
		expect(screen.getByText(/no stories found/i)).toBeInTheDocument();
	});

	it("renders unknown category gracefully", () => {
		render(
			<NuqsTestingAdapter>
				<TooltipProvider>
					<CategoryPage params={{ slug: "nonexistent" }} />
				</TooltipProvider>
			</NuqsTestingAdapter>,
		);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});
});
