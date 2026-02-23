import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserProfile } from "./user-profile";

vi.mock("convex/react", () => ({
	useQuery: () => [],
	useMutation: () => vi.fn(),
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
		render(<UserProfile user={mockUser} stories={[]} />);
		expect(screen.getByText("horror_dev")).toBeInTheDocument();
	});

	it("renders karma stat", () => {
		render(<UserProfile user={mockUser} stories={[]} />);
		expect(screen.getByText("150")).toBeInTheDocument();
		expect(screen.getByText(/karma/i)).toBeInTheDocument();
	});

	it("renders stories count", () => {
		render(<UserProfile user={mockUser} stories={[]} />);
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("renders badges", () => {
		render(<UserProfile user={mockUser} stories={[]} />);
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
				ripVotes: 10,
				totalVotes: 62,
				receiptIds: ["r1"],
				createdAt: Date.now() - 86400000,
				tags: [],
				isHidden: false,
				isRemoved: false,
			},
		];
		render(<UserProfile user={mockUser} stories={stories} />);
		expect(screen.getByText("My Horror Story")).toBeInTheDocument();
	});

	it("renders empty stories message", () => {
		render(<UserProfile user={mockUser} stories={[]} />);
		expect(screen.getByText(/no stories submitted/i)).toBeInTheDocument();
	});
});
