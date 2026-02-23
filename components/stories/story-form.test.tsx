import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StoryForm } from "./story-form";

const { mockMutation } = vi.hoisted(() => ({
	mockMutation: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useMutation: () => mockMutation,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		stories: {
			create: "stories:create",
			generateUploadUrl: "stories:generateUploadUrl",
		},
	},
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("StoryForm", () => {
	it("renders title input", () => {
		render(<StoryForm />);
		expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
	});

	it("renders body textarea", () => {
		render(<StoryForm />);
		expect(screen.getByLabelText(/story/i)).toBeInTheDocument();
	});

	it("renders category select", () => {
		render(<StoryForm />);
		expect(screen.getByText(/category/i)).toBeInTheDocument();
	});

	it("renders severity slider", () => {
		render(<StoryForm />);
		expect(screen.getByText(/severity/i)).toBeInTheDocument();
	});

	it("renders receipt tabs", () => {
		render(<StoryForm />);
		expect(screen.getByText(/screenshots/i)).toBeInTheDocument();
		expect(screen.getByText(/links/i)).toBeInTheDocument();
		expect(screen.getByText(/transcript/i)).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(<StoryForm />);
		expect(screen.getByRole("button", { name: /submit story/i })).toBeInTheDocument();
	});

	it("shows validation error when submitting empty form", async () => {
		const user = userEvent.setup();
		render(<StoryForm />);

		await user.click(screen.getByRole("button", { name: /submit story/i }));

		expect(screen.getByText(/title is required/i)).toBeInTheDocument();
	});

	it("renders optional fields", () => {
		render(<StoryForm />);
		expect(screen.getByLabelText(/incident date/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/openclaw version/i)).toBeInTheDocument();
	});
});
