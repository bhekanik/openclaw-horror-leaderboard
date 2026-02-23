import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UsernameForm } from "./username-form";

const { mockMutation } = vi.hoisted(() => ({
	mockMutation: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useMutation: () => mockMutation,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: { users: { setUsername: "users:setUsername" } },
}));

describe("UsernameForm", () => {
	it("renders username input", () => {
		render(<UsernameForm onComplete={vi.fn()} />);
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(<UsernameForm onComplete={vi.fn()} />);
		expect(screen.getByRole("button", { name: /set username/i })).toBeInTheDocument();
	});

	it("shows error for too short username", async () => {
		const user = userEvent.setup();
		render(<UsernameForm onComplete={vi.fn()} />);

		await user.type(screen.getByLabelText(/username/i), "ab");
		await user.click(screen.getByRole("button", { name: /set username/i }));

		expect(screen.getByText("Username must be 3-20 characters")).toBeInTheDocument();
	});

	it("shows error for invalid characters", async () => {
		const user = userEvent.setup();
		render(<UsernameForm onComplete={vi.fn()} />);

		await user.type(screen.getByLabelText(/username/i), "bad name!");
		await user.click(screen.getByRole("button", { name: /set username/i }));

		expect(
			screen.getByText("Username can only contain letters, numbers, and underscores"),
		).toBeInTheDocument();
	});

	it("calls mutation with valid username", async () => {
		const onComplete = vi.fn();
		const user = userEvent.setup();
		render(<UsernameForm onComplete={onComplete} />);

		await user.type(screen.getByLabelText(/username/i), "good_user");
		await user.click(screen.getByRole("button", { name: /set username/i }));

		expect(mockMutation).toHaveBeenCalledWith({ username: "good_user" });
	});
});
