import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReceiptTranscriptInput } from "./receipt-transcript-input";

describe("ReceiptTranscriptInput", () => {
	it("renders textarea", () => {
		render(<ReceiptTranscriptInput value="" onChange={vi.fn()} />);
		expect(screen.getByPlaceholderText(/paste.*transcript/i)).toBeInTheDocument();
	});

	it("calls onChange when typing", async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(<ReceiptTranscriptInput value="" onChange={onChange} />);

		await user.type(screen.getByPlaceholderText(/paste.*transcript/i), "log data");

		expect(onChange).toHaveBeenCalled();
	});

	it("shows character count", () => {
		render(<ReceiptTranscriptInput value="hello world" onChange={vi.fn()} />);
		expect(screen.getByText(/11/)).toBeInTheDocument();
	});
});
