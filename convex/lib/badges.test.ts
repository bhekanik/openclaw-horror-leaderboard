import { describe, expect, it } from "vitest";
import { checkBadges } from "./badges";

describe("checkBadges", () => {
	it("awards survivor badge after 1 story", () => {
		const badges = checkBadges([], { storiesCount: 1, verifiedVoteCount: 0, fakeFlagCount: 0 });
		expect(badges).toContain("survivor");
	});

	it("does not award survivor badge with 0 stories", () => {
		const badges = checkBadges([], { storiesCount: 0, verifiedVoteCount: 0, fakeFlagCount: 0 });
		expect(badges).not.toContain("survivor");
	});

	it("awards witness badge after 10 verified votes", () => {
		const badges = checkBadges([], { storiesCount: 0, verifiedVoteCount: 10, fakeFlagCount: 0 });
		expect(badges).toContain("witness");
	});

	it("does not award witness badge with 9 verified votes", () => {
		const badges = checkBadges([], { storiesCount: 0, verifiedVoteCount: 9, fakeFlagCount: 0 });
		expect(badges).not.toContain("witness");
	});

	it("awards skeptic badge after 10 fake flags", () => {
		const badges = checkBadges([], { storiesCount: 0, verifiedVoteCount: 0, fakeFlagCount: 10 });
		expect(badges).toContain("skeptic");
	});

	it("does not duplicate existing badges", () => {
		const badges = checkBadges(["survivor"], {
			storiesCount: 5,
			verifiedVoteCount: 0,
			fakeFlagCount: 0,
		});
		expect(badges.filter((b) => b === "survivor")).toHaveLength(1);
	});

	it("awards multiple badges at once", () => {
		const badges = checkBadges([], { storiesCount: 3, verifiedVoteCount: 15, fakeFlagCount: 12 });
		expect(badges).toContain("survivor");
		expect(badges).toContain("witness");
		expect(badges).toContain("skeptic");
	});

	it("preserves existing badges", () => {
		const badges = checkBadges(["custom_badge"], {
			storiesCount: 1,
			verifiedVoteCount: 0,
			fakeFlagCount: 0,
		});
		expect(badges).toContain("custom_badge");
		expect(badges).toContain("survivor");
	});
});
