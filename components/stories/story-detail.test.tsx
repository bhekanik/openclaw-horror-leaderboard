import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoryDetail } from "./story-detail";

vi.mock("react-markdown", () => ({
	default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));

vi.mock("rehype-sanitize", () => ({ default: {} }));
vi.mock("remark-gfm", () => ({ default: {} }));

vi.mock("convex/react", () => ({
	useMutation: () => vi.fn(),
	useQuery: () => null,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: { votes: { cast: "votes:cast", getUserVote: "votes:getUserVote" } },
}));

const mockStory = {
	_id: "story123" as any,
	title: "OpenClaw Deleted My Resume",
	body: "It happened on a **dark** Tuesday night...",
	category: "rogue",
	severity: 4,
	createdAt: Date.now() - 86400000,
	updatedAt: Date.now(),
	authorId: "user123" as any,
	tags: ["automation", "data-loss"],
	incidentDate: "2026-02-10",
	openclawVersion: "0.2.1",
	upvotes: 42,
	downvotes: 3,
	fakeFlags: 1,
	verifiedFlags: 5,
	ripVotes: 7,
	totalVotes: 58,
	horrorScore: 0.85,
	communitySeverity: 4.2,
	receiptIds: [],
	isHidden: false,
	isRemoved: false,
	reportCount: 0,
};

const mockReceipts = [
	{
		_id: "r1" as any,
		storyId: "story123" as any,
		type: "link" as const,
		url: "https://twitter.com/example/status/123",
		createdAt: Date.now(),
	},
	{
		_id: "r2" as any,
		storyId: "story123" as any,
		type: "transcript" as const,
		content: "User: Why did you delete my file?\nAgent: I determined it was unnecessary.",
		createdAt: Date.now(),
	},
];

const mockAuthor = {
	_id: "user123" as any,
	username: "traumatized_dev",
	karma: 50,
};

describe("StoryDetail", () => {
	it("renders story title", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText("OpenClaw Deleted My Resume")).toBeInTheDocument();
	});

	it("renders story body as markdown", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByTestId("markdown")).toBeInTheDocument();
	});

	it("renders category badge", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/it went rogue/i)).toBeInTheDocument();
	});

	it("renders author username", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText("traumatized_dev")).toBeInTheDocument();
	});

	it("renders tags", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText("automation")).toBeInTheDocument();
		expect(screen.getByText("data-loss")).toBeInTheDocument();
	});

	it("renders link receipts", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/twitter\.com/i)).toBeInTheDocument();
	});

	it("renders transcript receipts", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/why did you delete/i)).toBeInTheDocument();
	});

	it("renders severity", () => {
		render(
			<TooltipProvider>
				<StoryDetail story={mockStory} receipts={mockReceipts} author={mockAuthor} />
			</TooltipProvider>,
		);
		expect(screen.getByText(/4\/5/)).toBeInTheDocument();
	});
});
