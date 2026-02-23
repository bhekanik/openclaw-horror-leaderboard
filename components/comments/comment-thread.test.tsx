import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CommentThread } from "./comment-thread";

const { mockUseQuery } = vi.hoisted(() => ({
	mockUseQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useQuery: mockUseQuery,
	useMutation: () => vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		comments: { create: "comments:create", getByStory: "comments:getByStory" },
		commentVotes: { cast: "commentVotes:cast", getUserVotes: "commentVotes:getUserVotes" },
	},
}));

const mockComments = [
	{
		_id: "c1",
		storyId: "s1",
		authorId: "u1",
		body: "Top level comment",
		authorUsername: "user1",
		upvotes: 5,
		downvotes: 1,
		isRemoved: false,
		createdAt: Date.now() - 3600000,
		replies: [
			{
				_id: "c2",
				storyId: "s1",
				authorId: "u2",
				parentId: "c1",
				body: "A reply",
				authorUsername: "user2",
				upvotes: 2,
				downvotes: 0,
				isRemoved: false,
				createdAt: Date.now() - 1800000,
				replies: [],
			},
		],
	},
];

describe("CommentThread", () => {
	it("renders comments when loaded", () => {
		mockUseQuery.mockReturnValue(mockComments);
		render(<CommentThread storyId={"s1" as any} />);
		expect(screen.getByText("Top level comment")).toBeInTheDocument();
		expect(screen.getByText("A reply")).toBeInTheDocument();
	});

	it("renders comment form for new comments", () => {
		mockUseQuery.mockReturnValue(mockComments);
		render(<CommentThread storyId={"s1" as any} />);
		expect(screen.getByPlaceholderText(/add a comment/i)).toBeInTheDocument();
	});

	it("renders empty state when no comments", () => {
		mockUseQuery.mockReturnValue([]);
		render(<CommentThread storyId={"s1" as any} />);
		expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
	});

	it("renders loading state", () => {
		mockUseQuery.mockReturnValue(undefined);
		render(<CommentThread storyId={"s1" as any} />);
		expect(screen.getByText(/loading comments/i)).toBeInTheDocument();
	});

	it("renders comment count", () => {
		mockUseQuery.mockReturnValue(mockComments);
		render(<CommentThread storyId={"s1" as any} />);
		expect(screen.getByText(/comments/i)).toBeInTheDocument();
	});
});
