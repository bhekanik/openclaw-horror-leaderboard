import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RegisterPage from "./page";

vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signIn: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("Register Page", () => {
	it("renders the register form", () => {
		render(<RegisterPage />);
		expect(screen.getByText("Create Account")).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
	});
});
