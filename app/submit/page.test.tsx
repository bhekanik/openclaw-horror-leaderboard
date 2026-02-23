import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SubmitPage from "./page";

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
	useMutation: () => vi.fn(),
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

describe("Submit Page", () => {
	it("renders auth guard with sign in required message", () => {
		render(<SubmitPage />);
		expect(screen.getByText(/sign in required/i)).toBeInTheDocument();
	});

	it("renders story form in authenticated state", () => {
		render(<SubmitPage />);
		expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
	});
});
