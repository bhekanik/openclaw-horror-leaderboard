import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("About Page", () => {
	it("renders the heading", () => {
		render(<AboutPage />);
		expect(screen.getByRole("heading", { name: /what is this/i })).toBeInTheDocument();
	});

	it("renders description text", () => {
		render(<AboutPage />);
		expect(screen.getByText(/community-driven leaderboard/i)).toBeInTheDocument();
	});
});
