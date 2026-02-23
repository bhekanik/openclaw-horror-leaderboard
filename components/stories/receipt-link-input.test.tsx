import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReceiptLinkInput } from "./receipt-link-input";

describe("ReceiptLinkInput", () => {
	it("renders URL input and add button", () => {
		render(<ReceiptLinkInput links={[]} onChange={vi.fn()} />);
		expect(screen.getByPlaceholderText(/url/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
	});

	it("adds a valid URL", async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(<ReceiptLinkInput links={[]} onChange={onChange} />);

		await user.type(screen.getByPlaceholderText(/url/i), "https://example.com/proof");
		await user.click(screen.getByRole("button", { name: /add/i }));

		expect(onChange).toHaveBeenCalledWith(["https://example.com/proof"]);
	});

	it("displays existing links", () => {
		render(
			<ReceiptLinkInput
				links={["https://example.com/1", "https://example.com/2"]}
				onChange={vi.fn()}
			/>,
		);
		expect(screen.getByText("https://example.com/1")).toBeInTheDocument();
		expect(screen.getByText("https://example.com/2")).toBeInTheDocument();
	});

	it("removes a link when remove button is clicked", async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(
			<ReceiptLinkInput
				links={["https://example.com/1", "https://example.com/2"]}
				onChange={onChange}
			/>,
		);

		const removeButtons = screen.getAllByRole("button", { name: /remove/i });
		await user.click(removeButtons[0]);

		expect(onChange).toHaveBeenCalledWith(["https://example.com/2"]);
	});
});
