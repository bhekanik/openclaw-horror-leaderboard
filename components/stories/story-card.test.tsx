import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoryCard } from "./story-card";

vi.mock("convex/react", () => ({
	useMutation: () => vi.fn(),
	useQuery: () => null,
	useConvexAuth: () => ({ isAuthenticated: false, isLoading: false }),
}));

vi.mock("@/convex/_generated/api", () => ({
	api: { votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" } },
}));

const mockStory = {
	_id: "story123" as any,
	title: "Agent Deleted My Production Database",
	category: "rogue",
	severity: 5,
	horrorScore: 0.85,
	upvotes: 42,
	downvotes: 3,
	fakeFlags: 1,
	verifiedFlags: 5,
	ripVotes: 7,
	totalVotes: 58,
	receiptIds: ["r1", "r2", "r3"] as any[],
	createdAt: Date.now() - 86400000,
	authorUsername: "scared_dev",
	tags: ["data-loss"],
	isHidden: false,
	isRemoved: false,
};

function renderCard(props: any = {}) {
	return render(
		<TooltipProvider>
			<StoryCard story={mockStory} {...props} />
		</TooltipProvider>,
	);
}

describe("StoryCard", () => {
	it("renders story title as link", () => {
		renderCard();
		const link = screen.getByRole("link", { name: /agent deleted my production database/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/story/story123");
	});

	it("renders horror score prominently", () => {
		renderCard();
		expect(screen.getByText("0.85")).toBeInTheDocument();
	});

	it("renders category badge", () => {
		renderCard();
		expect(screen.getByText(/it went rogue/i)).toBeInTheDocument();
	});

	it("renders receipt count", () => {
		renderCard();
		expect(screen.getByText(/3 receipts/i)).toBeInTheDocument();
	});

	it("renders author username", () => {
		renderCard();
		expect(screen.getByText("scared_dev")).toBeInTheDocument();
	});

	it("renders vote buttons", () => {
		renderCard();
		expect(screen.getByRole("button", { name: /upvote/i })).toBeInTheDocument();
	});
});
