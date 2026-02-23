import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserMenu } from "./user-menu";

const mockSignOut = vi.fn();
vi.mock("@convex-dev/auth/react", () => ({
	useAuthActions: () => ({ signOut: mockSignOut }),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

describe("UserMenu", () => {
	const defaultUser = {
		username: "testuser",
		email: "test@example.com",
	};

	it("renders username as trigger button", () => {
		render(<UserMenu user={defaultUser} />);
		expect(screen.getByRole("button", { name: /testuser/i })).toBeInTheDocument();
	});

	it("shows dropdown items when clicked", async () => {
		const user = userEvent.setup();
		render(<UserMenu user={defaultUser} />);

		await user.click(screen.getByRole("button", { name: /testuser/i }));

		expect(screen.getByText(/profile/i)).toBeInTheDocument();
		expect(screen.getByText(/sign out/i)).toBeInTheDocument();
	});

	it("calls signOut when sign out is clicked", async () => {
		const user = userEvent.setup();
		render(<UserMenu user={defaultUser} />);

		await user.click(screen.getByRole("button", { name: /testuser/i }));
		await user.click(screen.getByText(/sign out/i));

		expect(mockSignOut).toHaveBeenCalled();
	});

	it("shows email fallback when no username", () => {
		render(<UserMenu user={{ email: "test@example.com" }} />);
		expect(screen.getByRole("button", { name: /test@example\.com/i })).toBeInTheDocument();
	});
});
