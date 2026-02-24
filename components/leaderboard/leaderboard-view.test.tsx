import { render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeaderboardView } from "./leaderboard-view";

// IntersectionObserver not available in jsdom
class MockIntersectionObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	constructor() {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

const { mockUsePaginatedQuery } = vi.hoisted(() => ({
	mockUsePaginatedQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	usePaginatedQuery: mockUsePaginatedQuery,
	useMutation: () => vi.fn(),
	useConvexAuth: () => ({ isAuthenticated: true, isLoading: false }),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { listPaginated: "stories:listPaginated" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

const mockStories = [
	{
		_id: "s1",
		title: "First Horror Story",
		category: "rogue",
		severity: 4,
		horrorScore: 0.9,
		upvotes: 50,
		downvotes: 2,
		fakeFlags: 0,
		verifiedFlags: 3,
		ripVotes: 10,
		totalVotes: 62,
		receiptIds: ["r1"],
		createdAt: Date.now() - 86400000,
		tags: [],
	},
	{
		_id: "s2",
		title: "Second Horror Story",
		category: "security",
		severity: 3,
		horrorScore: 0.7,
		upvotes: 30,
		downvotes: 5,
		fakeFlags: 1,
		verifiedFlags: 2,
		ripVotes: 3,
		totalVotes: 38,
		receiptIds: ["r2", "r3"],
		createdAt: Date.now() - 172800000,
		tags: [],
	},
];

function renderView() {
	return render(
		<NuqsTestingAdapter>
			<TooltipProvider>
				<LeaderboardView />
			</TooltipProvider>
		</NuqsTestingAdapter>,
	);
}

describe("LeaderboardView", () => {
	it("renders virtualized list container when stories loaded", () => {
		mockUsePaginatedQuery.mockReturnValue({
			results: mockStories,
			status: "Exhausted",
			loadMore: vi.fn(),
		});
		renderView();
		// Virtualizer creates a sized container — jsdom has 0-height viewport
		// so no story cards render, but the container should exist
		const container = document.querySelector("[style*='position: relative']");
		expect(container).toBeInTheDocument();
		// No empty state should show
		expect(screen.queryByText(/no stories found/i)).not.toBeInTheDocument();
	});

	it("renders filter controls", () => {
		mockUsePaginatedQuery.mockReturnValue({
			results: mockStories,
			status: "Exhausted",
			loadMore: vi.fn(),
		});
		renderView();
		// Time and sort are in select dropdowns; "All Time" is visible as default
		expect(screen.getByText(/all time/i)).toBeInTheDocument();
		expect(screen.getByText(/top scored/i)).toBeInTheDocument();
		// Category toggle group is present
		expect(screen.getByRole("group")).toBeInTheDocument();
	});

	it("renders empty state when no stories", () => {
		mockUsePaginatedQuery.mockReturnValue({
			results: [],
			status: "Exhausted",
			loadMore: vi.fn(),
		});
		renderView();
		expect(screen.getByText(/no stories found/i)).toBeInTheDocument();
	});

	it("renders loading state", () => {
		mockUsePaginatedQuery.mockReturnValue({
			results: [],
			status: "LoadingFirstPage",
			loadMore: vi.fn(),
		});
		renderView();
		// Should show skeleton loaders
		const skeletons = document.querySelectorAll("[data-slot='skeleton']");
		expect(skeletons.length).toBeGreaterThan(0);
	});
});
