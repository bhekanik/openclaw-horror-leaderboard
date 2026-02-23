import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserPage from "./page";

const { mockUseQuery } = vi.hoisted(() => ({
	mockUseQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useQuery: mockUseQuery,
	useMutation: () => vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		users: { getByUsername: "users:getByUsername" },
		stories: { listByAuthor: "stories:listByAuthor", list: "stories:list" },
		votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" },
	},
}));

const mockUser = {
	_id: "u1",
	username: "horror_dev",
	karma: 150,
	storiesCount: 3,
	totalHorrorScore: 8.5,
	badges: ["survivor"],
	_creationTime: Date.now() - 30 * 86400000,
};

describe("UserPage", () => {
	it("renders user profile when loaded", () => {
		mockUseQuery.mockImplementation((query: string) => {
			if (query === "users:getByUsername") return mockUser;
			if (query === "stories:listByAuthor") return [];
			return null;
		});
		render(<UserPage params={{ username: "horror_dev" }} />);
		expect(screen.getByText("horror_dev")).toBeInTheDocument();
	});

	it("renders 404 for non-existent user", () => {
		mockUseQuery.mockImplementation((query: string) => {
			if (query === "users:getByUsername") return null;
			return [];
		});
		render(<UserPage params={{ username: "nobody" }} />);
		expect(screen.getByText(/user not found/i)).toBeInTheDocument();
	});

	it("renders loading state", () => {
		mockUseQuery.mockReturnValue(undefined);
		render(<UserPage params={{ username: "horror_dev" }} />);
		expect(screen.getByTestId("profile-loading")).toBeInTheDocument();
	});
});
