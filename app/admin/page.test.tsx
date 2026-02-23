import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AdminPage from "./page";

const { mockUseQuery } = vi.hoisted(() => ({
	mockUseQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useQuery: mockUseQuery,
	useMutation: () => vi.fn(),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		users: { currentUser: "users:currentUser" },
		admin: { getStats: "admin:getStats", reviewReport: "admin:reviewReport" },
		reports: { listPending: "reports:listPending" },
	},
}));

describe("AdminPage", () => {
	it("renders admin dashboard when user is admin", () => {
		mockUseQuery.mockImplementation((query: string) => {
			if (query === "users:currentUser") return { isAdmin: true, username: "admin" };
			if (query === "admin:getStats") return { pendingReportCount: 3 };
			if (query === "reports:listPending") return [];
			return null;
		});
		render(<AdminPage />);
		expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
	});

	it("shows access denied for non-admin users", () => {
		mockUseQuery.mockImplementation((query: string) => {
			if (query === "users:currentUser") return { isAdmin: false, username: "user" };
			return null;
		});
		render(<AdminPage />);
		expect(screen.getByText(/access denied/i)).toBeInTheDocument();
	});

	it("shows pending report count", () => {
		mockUseQuery.mockImplementation((query: string) => {
			if (query === "users:currentUser") return { isAdmin: true, username: "admin" };
			if (query === "admin:getStats") return { pendingReportCount: 5 };
			if (query === "reports:listPending") return [];
			return null;
		});
		render(<AdminPage />);
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("shows loading state", () => {
		mockUseQuery.mockReturnValue(undefined);
		render(<AdminPage />);
		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});
});
