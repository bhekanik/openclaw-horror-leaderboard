import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProfile } from "./user-profile";

vi.mock("convex/react", () => ({
	useQuery: () => [],
	useMutation: () => vi.fn(),
	useConvexAuth: () => ({ isAuthenticated: false, isLoading: false }),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: { listByAuthor: "stories:listByAuthor", list: "stories:list" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

const mockUser = {
	_id: "u1",
	username: "horror_dev",
	displayName: "Horror Developer",
	karma: 150,
	storiesCount: 5,
	totalHorrorScore: 12.5,
	badges: ["survivor", "witness"],
	_creationTime: Date.now() - 30 * 86400000,
};

describe("UserProfile", () => {
	it("renders username", () => {
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={[]} />
			</TooltipProvider>,
		);
		expect(screen.getByText("horror_dev")).toBeInTheDocument();
	});

	it("renders karma stat", () => {
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={[]} />
			</TooltipProvider>,
		);
		expect(screen.getByText("150")).toBeInTheDocument();
		expect(screen.getByText(/karma/i)).toBeInTheDocument();
	});

	it("renders stories count", () => {
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={[]} />
			</TooltipProvider>,
		);
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("renders badges", () => {
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={[]} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/survivor/i)).toBeInTheDocument();
		expect(screen.getByText(/witness/i)).toBeInTheDocument();
	});

	it("renders user stories", () => {
		const stories = [
			{
				_id: "s1",
				title: "My Horror Story",
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
				isHidden: false,
				isRemoved: false,
			},
		];
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={stories} />
			</TooltipProvider>,
		);
		expect(screen.getByText("My Horror Story")).toBeInTheDocument();
	});

	it("renders empty stories message", () => {
		render(
			<TooltipProvider>
				<UserProfile user={mockUser} stories={[]} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/no stories submitted/i)).toBeInTheDocument();
	});
});
