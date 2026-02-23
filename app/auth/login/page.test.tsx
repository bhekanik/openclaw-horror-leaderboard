import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "./page";

vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signIn: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("Login Page", () => {
	it("renders the login form", () => {
		render(<LoginPage />);
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
	});
});
