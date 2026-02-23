import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./header";

vi.mock("@/convex/_generated/api", () => ({
	api: { users: { currentUser: "users:currentUser" } },
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
	useQuery: () => null,
}));

vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signOut: vi.fn() }),
}));

describe("Header", () => {
	it("renders the site name", () => {
		render(<Header />);
		expect(screen.getByText("OpenClaw Horror")).toBeInTheDocument();
	});

	it("renders navigation links", () => {
		render(<Header />);
		expect(screen.getByRole("link", { name: /leaderboard/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /submit/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
	});

	it("renders login link when unauthenticated", () => {
		render(<Header />);
		expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
	});

	it("renders tagline", () => {
		render(<Header />);
		expect(
			screen.getByText("The worst things OpenClaw has done to real people"),
		).toBeInTheDocument();
	});
});
