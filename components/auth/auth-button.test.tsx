import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthButton } from "./auth-button";

const { mockUseQuery } = vi.hoisted(() => ({
	mockUseQuery: vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		users: {
			currentUser: "users:currentUser",
		},
	},
}));

vi.mock("convex/react", () => ({
	Authenticated: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="authenticated">{children}</div>
	),
	Unauthenticated: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="unauthenticated">{children}</div>
	),
	AuthLoading: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="auth-loading">{children}</div>
	),
	useQuery: mockUseQuery,
}));

vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signOut: vi.fn() }),
}));

describe("AuthButton", () => {
	it("renders login link in unauthenticated state", () => {
		mockUseQuery.mockReturnValue(null);
		render(<AuthButton />);
		expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
	});

	it("renders user menu in authenticated state", () => {
		mockUseQuery.mockReturnValue({ username: "testuser", email: "test@example.com" });
		render(<AuthButton />);
		expect(screen.getByText(/testuser/i)).toBeInTheDocument();
	});
});
