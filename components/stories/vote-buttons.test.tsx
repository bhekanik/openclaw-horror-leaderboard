import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VoteButtons } from "./vote-buttons";

const { mockMutation, mockUseQuery } = vi.hoisted(() => ({
	mockMutation: vi.fn(),
	mockUseQuery: vi.fn(),
}));

vi.mock("convex/react", () => ({
	useMutation: () => mockMutation,
	useQuery: mockUseQuery,
	Authenticated: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	Unauthenticated: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: {
		votes: {
			cast: "votes:cast",
			getUserVote: "votes:getUserVote",
		},
	},
}));

function renderWithProviders(ui: React.ReactNode) {
	return render(<TooltipProvider>{ui}</TooltipProvider>);
}

describe("VoteButtons", () => {
	const defaultProps = {
		storyId: "story123" as any,
		upvotes: 42,
		downvotes: 3,
		fakeFlags: 1,
		verifiedFlags: 5,
		ripVotes: 7,
		isAuthenticated: true,
	};

	it("renders all 5 vote buttons", () => {
		mockUseQuery.mockReturnValue(null);
		renderWithProviders(<VoteButtons {...defaultProps} />);
		expect(screen.getByRole("button", { name: /upvote/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /downvote/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /fake/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /verified/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /rip/i })).toBeInTheDocument();
	});

	it("displays vote counts", () => {
		mockUseQuery.mockReturnValue(null);
		renderWithProviders(<VoteButtons {...defaultProps} />);
		expect(screen.getByText("42")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("highlights the user's current vote", () => {
		mockUseQuery.mockReturnValue("upvote");
		renderWithProviders(<VoteButtons {...defaultProps} />);
		const upvoteBtn = screen.getByRole("button", { name: /upvote/i });
		expect(upvoteBtn).toHaveAttribute("data-active", "true");
	});

	it("calls mutation on vote click", async () => {
		mockUseQuery.mockReturnValue(null);
		const user = userEvent.setup();
		renderWithProviders(<VoteButtons {...defaultProps} />);

		await user.click(screen.getByRole("button", { name: /upvote/i }));

		expect(mockMutation).toHaveBeenCalledWith({
			storyId: "story123",
			type: "upvote",
		});
	});

	it("disables buttons when not authenticated", () => {
		mockUseQuery.mockReturnValue(null);
		renderWithProviders(<VoteButtons {...defaultProps} isAuthenticated={false} />);
		const buttons = screen.getAllByRole("button");
		for (const btn of buttons) {
			expect(btn).toBeDisabled();
		}
	});
});
