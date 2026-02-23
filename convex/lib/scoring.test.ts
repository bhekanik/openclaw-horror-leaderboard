import { describe, expect, it } from "vitest";
import {
	authenticityMultiplier,
	calculateHorrorScore,
	freshnessBoost,
	severityWeight,
	wilsonLowerBound,
} from "./scoring";

describe("wilsonLowerBound", () => {
	it("returns 0 for no votes", () => {
		expect(wilsonLowerBound(0, 0)).toBe(0);
	});

	it("returns higher score for better ratio", () => {
		const perfect = wilsonLowerBound(10, 10);
		const mixed = wilsonLowerBound(10, 20);
		expect(perfect).toBeGreaterThan(mixed);
	});

	it("favors more votes at same ratio", () => {
		const few = wilsonLowerBound(5, 5);
		const many = wilsonLowerBound(100, 100);
		expect(many).toBeGreaterThan(few);
	});

	it("returns value between 0 and 1", () => {
		const score = wilsonLowerBound(50, 100);
		expect(score).toBeGreaterThan(0);
		expect(score).toBeLessThan(1);
	});
});

describe("authenticityMultiplier", () => {
	it("returns 1.0 with no flags", () => {
		expect(authenticityMultiplier(0, 0, 0, false)).toBe(1.0);
	});

	it("decreases with fake flags", () => {
		expect(authenticityMultiplier(5, 0, 0, false)).toBe(0.75);
	});

	it("increases with verified flags", () => {
		expect(authenticityMultiplier(0, 5, 0, false)).toBe(1.15);
	});

	it("clamps at minimum 0.1", () => {
		expect(authenticityMultiplier(100, 0, 0, false)).toBe(0.1);
	});

	it("clamps at maximum 1.5", () => {
		expect(authenticityMultiplier(0, 100, 10, true)).toBe(1.5);
	});

	it("adds bonus for 3+ receipts", () => {
		expect(authenticityMultiplier(0, 0, 3, false)).toBe(1.1);
	});

	it("adds bonus for external links", () => {
		expect(authenticityMultiplier(0, 0, 0, true)).toBe(1.05);
	});
});

describe("freshnessBoost", () => {
	it("returns ~1.5 for brand new stories", () => {
		const boost = freshnessBoost(Date.now());
		expect(boost).toBeCloseTo(1.5, 1);
	});

	it("returns ~1.0 for old stories", () => {
		const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
		const boost = freshnessBoost(thirtyDaysAgo);
		expect(boost).toBeCloseTo(1.0, 1);
	});

	it("decays smoothly between values", () => {
		const fresh = freshnessBoost(Date.now() - 12 * 60 * 60 * 1000); // 12h
		const week = freshnessBoost(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3d
		expect(fresh).toBeGreaterThan(week);
		expect(fresh).toBeGreaterThan(1.0);
	});
});

describe("severityWeight", () => {
	it("returns 1.0 for severity 1", () => {
		expect(severityWeight(1)).toBe(1.0);
	});

	it("returns 1.25 for severity 5", () => {
		expect(severityWeight(5)).toBe(1.25);
	});

	it("returns intermediate values", () => {
		expect(severityWeight(3)).toBeCloseTo(1.125, 3);
	});
});

describe("calculateHorrorScore", () => {
	it("returns 0 for no votes", () => {
		const score = calculateHorrorScore({
			upvotes: 0,
			downvotes: 0,
			ripVotes: 0,
			fakeFlags: 0,
			verifiedFlags: 0,
			receiptCount: 1,
			hasExternalLinks: false,
			communitySeverity: 3,
			createdAt: Date.now(),
		});
		expect(score).toBe(0);
	});

	it("returns positive score for upvoted story", () => {
		const score = calculateHorrorScore({
			upvotes: 10,
			downvotes: 1,
			ripVotes: 5,
			fakeFlags: 0,
			verifiedFlags: 3,
			receiptCount: 4,
			hasExternalLinks: true,
			communitySeverity: 4,
			createdAt: Date.now(),
		});
		expect(score).toBeGreaterThan(0);
	});

	it("heavily flagged story has lower score", () => {
		const normal = calculateHorrorScore({
			upvotes: 10,
			downvotes: 2,
			ripVotes: 0,
			fakeFlags: 0,
			verifiedFlags: 0,
			receiptCount: 1,
			hasExternalLinks: false,
			communitySeverity: 3,
			createdAt: Date.now(),
		});
		const flagged = calculateHorrorScore({
			upvotes: 10,
			downvotes: 2,
			ripVotes: 0,
			fakeFlags: 10,
			verifiedFlags: 0,
			receiptCount: 1,
			hasExternalLinks: false,
			communitySeverity: 3,
			createdAt: Date.now(),
		});
		expect(flagged).toBeLessThan(normal);
	});
});
