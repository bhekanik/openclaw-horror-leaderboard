import { describe, expect, it } from "vitest";
import { shouldAutoHide } from "./moderation";

describe("shouldAutoHide", () => {
	it("returns true when fakeFlags >10 and verifiedFlags <5", () => {
		expect(shouldAutoHide(11, 4)).toBe(true);
	});

	it("returns false when fakeFlags <=10", () => {
		expect(shouldAutoHide(10, 2)).toBe(false);
	});

	it("returns false when verifiedFlags >=5", () => {
		expect(shouldAutoHide(15, 5)).toBe(false);
	});

	it("returns false when both conditions not met", () => {
		expect(shouldAutoHide(5, 10)).toBe(false);
	});

	it("returns true at threshold boundary", () => {
		expect(shouldAutoHide(11, 0)).toBe(true);
	});
});
