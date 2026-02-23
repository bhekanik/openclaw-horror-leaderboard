import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import CategoryPage from "./page";

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

describe("Category Page", () => {
	it("renders category heading with emoji and label", () => {
		render(<TooltipProvider><CategoryPage params={{ slug: "rogue" }} /></TooltipProvider>);
		expect(screen.getByRole("heading", { name: /it went rogue/i })).toBeInTheDocument();
	});

	it("renders leaderboard filtered by category", () => {
		render(<TooltipProvider><CategoryPage params={{ slug: "security" }} /></TooltipProvider>);
		expect(screen.getByText(/no stories yet/i)).toBeInTheDocument();
	});

	it("renders unknown category gracefully", () => {
		render(<TooltipProvider><CategoryPage params={{ slug: "nonexistent" }} /></TooltipProvider>);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});
});
