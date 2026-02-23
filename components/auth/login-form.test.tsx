import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "./login-form";

// Mock Convex auth actions
const mockSignIn = vi.fn();
vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signIn: mockSignIn }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("LoginForm", () => {
	it("renders email and password inputs", () => {
		render(<LoginForm />);
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
	});

	it("renders sign in button", () => {
		render(<LoginForm />);
		expect(screen.getByRole("button", { name: /^sign in$/i })).toBeInTheDocument();
	});

	it("renders GitHub sign in button", () => {
		render(<LoginForm />);
		expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
	});

	it("renders link to register page", () => {
		render(<LoginForm />);
		expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
	});

	it("calls signIn with password provider on form submit", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/password/i), "password123");
		await user.click(screen.getByRole("button", { name: /^sign in$/i }));

		expect(mockSignIn).toHaveBeenCalledWith("password", expect.any(FormData));
	});

	it("calls signIn with github provider on GitHub button click", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		await user.click(screen.getByRole("button", { name: /github/i }));

		expect(mockSignIn).toHaveBeenCalledWith("github", { redirectTo: "/" });
	});

	it("shows error state when signIn fails", async () => {
		mockSignIn.mockRejectedValueOnce(new Error("Invalid credentials"));
		const user = userEvent.setup();
		render(<LoginForm />);

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/password/i), "wrong");
		await user.click(screen.getByRole("button", { name: /^sign in$/i }));

		expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
	});
});
