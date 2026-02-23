import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommentForm } from "./comment-form";

const mockMutate = vi.fn();

vi.mock("convex/react", () => ({
	useMutation: () => mockMutate,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: { comments: { create: "comments:create" } },
}));

describe("CommentForm", () => {
	it("renders textarea and submit button", () => {
		render(<CommentForm storyId={"s1" as any} />);
		expect(screen.getByPlaceholderText(/add a comment/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /comment/i })).toBeInTheDocument();
	});

	it("disables submit when empty", () => {
		render(<CommentForm storyId={"s1" as any} />);
		expect(screen.getByRole("button", { name: /comment/i })).toBeDisabled();
	});

	it("enables submit when text entered", async () => {
		const user = userEvent.setup();
		render(<CommentForm storyId={"s1" as any} />);
		await user.type(screen.getByPlaceholderText(/add a comment/i), "Great story!");
		expect(screen.getByRole("button", { name: /comment/i })).toBeEnabled();
	});

	it("calls mutation on submit", async () => {
		const user = userEvent.setup();
		render(<CommentForm storyId={"s1" as any} />);
		await user.type(screen.getByPlaceholderText(/add a comment/i), "My comment");
		await user.click(screen.getByRole("button", { name: /comment/i }));
		expect(mockMutate).toHaveBeenCalledWith({
			storyId: "s1",
			body: "My comment",
		});
	});

	it("passes parentId when replying", async () => {
		const user = userEvent.setup();
		render(<CommentForm storyId={"s1" as any} parentId={"c1" as any} />);
		await user.type(screen.getByPlaceholderText(/reply/i), "My reply");
		await user.click(screen.getByRole("button", { name: /reply/i }));
		expect(mockMutate).toHaveBeenCalledWith({
			storyId: "s1",
			parentId: "c1",
			body: "My reply",
		});
	});
});
