import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
	it("renders 404 heading", () => {
		render(<NotFound />);
		expect(screen.getByText("404")).toBeInTheDocument();
	});

	it("renders horror-themed message", () => {
		render(<NotFound />);
		expect(screen.getByText(/openclaw deleted this page/i)).toBeInTheDocument();
	});

	it("has link back to leaderboard", () => {
		render(<NotFound />);
		expect(screen.getByRole("link", { name: /back to the leaderboard/i })).toHaveAttribute(
			"href",
			"/",
		);
	});
});
