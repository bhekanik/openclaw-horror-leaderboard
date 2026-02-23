import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LeaderboardView } from "./leaderboard-view";

const { mockUseQuery } = vi.hoisted(() => ({
	mockUseQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useQuery: mockUseQuery,
	useMutation: () => vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { list: "stories:list" },
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
		ripVotes: 10,
		totalVotes: 62,
		receiptIds: ["r1"],
		createdAt: Date.now() - 86400000,
		tags: [],
		isHidden: false,
		isRemoved: false,
	},
	{
		_id: "s2",
		title: "Second Horror Story",
		category: "security",
		severity: 3,
		horrorScore: 0.7,
		upvotes: 30,
		downvotes: 5,
		ripVotes: 3,
		totalVotes: 38,
		receiptIds: ["r2", "r3"],
		createdAt: Date.now() - 172800000,
		tags: [],
		isHidden: false,
		isRemoved: false,
	},
];

describe("LeaderboardView", () => {
	it("renders stories when loaded", () => {
		mockUseQuery.mockReturnValue(mockStories);
		render(<LeaderboardView />);
		expect(screen.getByText("First Horror Story")).toBeInTheDocument();
		expect(screen.getByText("Second Horror Story")).toBeInTheDocument();
	});

	it("renders time filter tabs", () => {
		mockUseQuery.mockReturnValue(mockStories);
		render(<LeaderboardView />);
		expect(screen.getByText(/all time/i)).toBeInTheDocument();
		expect(screen.getByText(/this week/i)).toBeInTheDocument();
		expect(screen.getByText(/this month/i)).toBeInTheDocument();
	});

	it("renders empty state when no stories", () => {
		mockUseQuery.mockReturnValue([]);
		render(<LeaderboardView />);
		expect(screen.getByText(/no stories yet/i)).toBeInTheDocument();
	});

	it("renders loading state", () => {
		mockUseQuery.mockReturnValue(undefined);
		render(<LeaderboardView />);
		expect(screen.getByTestId("leaderboard-loading")).toBeInTheDocument();
	});
});
