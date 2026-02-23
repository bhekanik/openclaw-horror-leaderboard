import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegisterForm } from "./register-form";

const mockSignIn = vi.fn();
vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signIn: mockSignIn }),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("RegisterForm", () => {
	it("renders email and password inputs", () => {
		render(<RegisterForm />);
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
	});

	it("renders confirm password input", () => {
		render(<RegisterForm />);
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
	});

	it("renders sign up button", () => {
		render(<RegisterForm />);
		expect(screen.getByRole("button", { name: /^sign up$/i })).toBeInTheDocument();
	});

	it("renders GitHub sign up button", () => {
		render(<RegisterForm />);
		expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
	});

	it("renders link to login page", () => {
		render(<RegisterForm />);
		expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
	});

	it("shows error when passwords do not match", async () => {
		const user = userEvent.setup();
		render(<RegisterForm />);

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "different");
		await user.click(screen.getByRole("button", { name: /^sign up$/i }));

		expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
		expect(mockSignIn).not.toHaveBeenCalled();
	});

	it("shows error when password is too short", async () => {
		const user = userEvent.setup();
		render(<RegisterForm />);

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "short");
		await user.type(screen.getByLabelText(/confirm password/i), "short");
		await user.click(screen.getByRole("button", { name: /^sign up$/i }));

		expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
		expect(mockSignIn).not.toHaveBeenCalled();
	});

	it("calls signIn with password provider on valid form submit", async () => {
		const user = userEvent.setup();
		render(<RegisterForm />);

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "password123");
		await user.type(screen.getByLabelText(/confirm password/i), "password123");
		await user.click(screen.getByRole("button", { name: /^sign up$/i }));

		expect(mockSignIn).toHaveBeenCalledWith("password", expect.any(FormData));
	});
});
