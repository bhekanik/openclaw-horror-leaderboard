import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
	it("renders the disclaimer", () => {
		render(<Footer />);
		expect(screen.getByText(/not affiliated with openclaw/i)).toBeInTheDocument();
	});

	it("renders about link", () => {
		render(<Footer />);
		expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
	});

	it("renders leaderboard link", () => {
		render(<Footer />);
		expect(screen.getByRole("link", { name: /leaderboard/i })).toBeInTheDocument();
	});
});
