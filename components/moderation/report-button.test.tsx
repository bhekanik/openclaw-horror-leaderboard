import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReportButton } from "./report-button";

const mockMutate = vi.fn();

vi.mock("convex/react", () => ({
	useMutation: () => mockMutate,
}));

vi.mock("@/convex/_generated/api", () => ({
	api: { reports: { create: "reports:create" } },
}));

describe("ReportButton", () => {
	it("renders report button", () => {
		render(<ReportButton storyId={"s1" as any} />);
		expect(screen.getByRole("button", { name: /report/i })).toBeInTheDocument();
	});

	it("opens report dialog on click", async () => {
		const user = userEvent.setup();
		render(<ReportButton storyId={"s1" as any} />);
		await user.click(screen.getByRole("button", { name: /report/i }));
		expect(screen.getByText(/select a reason/i)).toBeInTheDocument();
	});

	it("shows reason options", async () => {
		const user = userEvent.setup();
		render(<ReportButton storyId={"s1" as any} />);
		await user.click(screen.getByRole("button", { name: /report/i }));
		expect(screen.getByText(/spam/i)).toBeInTheDocument();
		expect(screen.getByText(/fake story/i)).toBeInTheDocument();
	});

	it("submits report with reason", async () => {
		const user = userEvent.setup();
		render(<ReportButton storyId={"s1" as any} />);
		await user.click(screen.getByRole("button", { name: /report/i }));
		await user.click(screen.getByText(/spam/i));
		await user.click(screen.getByRole("button", { name: /submit report/i }));
		expect(mockMutate).toHaveBeenCalledWith({
			storyId: "s1",
			reason: "spam",
		});
	});
});
