import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommentItem } from "./comment-item";

const mockMutate = vi.fn();

vi.mock("convex/react", () => ({
	useMutation: () => mockMutate,
	useQuery: () => null,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		comments: { create: "comments:create" },
		commentVotes: { cast: "commentVotes:cast", getUserVotes: "commentVotes:getUserVotes" },
	},
}));

const mockComment = {
	_id: "c1" as any,
	storyId: "s1" as any,
	authorId: "u1" as any,
	body: "This is terrifying!",
	authorUsername: "dev_survivor",
	upvotes: 12,
	downvotes: 2,
	isRemoved: false,
	createdAt: Date.now() - 3600000,
	replies: [],
};

describe("CommentItem", () => {
	it("renders comment body", () => {
		render(<CommentItem comment={mockComment} storyId={"s1" as any} />);
		expect(screen.getByText("This is terrifying!")).toBeInTheDocument();
	});

	it("renders author username", () => {
		render(<CommentItem comment={mockComment} storyId={"s1" as any} />);
		expect(screen.getByText("dev_survivor")).toBeInTheDocument();
	});

	it("renders vote counts", () => {
		render(<CommentItem comment={mockComment} storyId={"s1" as any} />);
		expect(screen.getByText("12")).toBeInTheDocument();
	});

	it("renders reply button", () => {
		render(<CommentItem comment={mockComment} storyId={"s1" as any} />);
		expect(screen.getByRole("button", { name: /reply/i })).toBeInTheDocument();
	});

	it("shows reply form when reply button clicked", async () => {
		const user = userEvent.setup();
		render(<CommentItem comment={mockComment} storyId={"s1" as any} />);
		await user.click(screen.getByRole("button", { name: /reply/i }));
		expect(screen.getByPlaceholderText(/reply/i)).toBeInTheDocument();
	});

	it("renders nested replies", () => {
		const commentWithReplies = {
			...mockComment,
			replies: [
				{
					_id: "c2" as any,
					storyId: "s1" as any,
					authorId: "u2" as any,
					parentId: "c1" as any,
					body: "I agree, totally scary",
					authorUsername: "another_dev",
					upvotes: 3,
					downvotes: 0,
					isRemoved: false,
					createdAt: Date.now() - 1800000,
					replies: [],
				},
			],
		};
		render(<CommentItem comment={commentWithReplies} storyId={"s1" as any} />);
		expect(screen.getByText("I agree, totally scary")).toBeInTheDocument();
		expect(screen.getByText("another_dev")).toBeInTheDocument();
	});

	it("does not render reply button on nested replies (max depth)", () => {
		render(<CommentItem comment={mockComment} storyId={"s1" as any} depth={1} />);
		expect(screen.queryByRole("button", { name: /reply/i })).not.toBeInTheDocument();
	});
});
