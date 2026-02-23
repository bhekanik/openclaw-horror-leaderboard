/**
 * Wilson score lower bound (95% confidence)
 * Reddit-style ranking that accounts for vote count AND ratio.
 */
export function wilsonLowerBound(positive: number, total: number): number {
	if (total === 0) return 0;
	const z = 1.96; // 95% confidence
	const phat = positive / total;
	const denominator = 1 + (z * z) / total;
	const center = phat + (z * z) / (2 * total);
	const spread = z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);
	return (center - spread) / denominator;
}

/**
 * Authenticity multiplier based on fake/verified flags and receipts.
 * Range: 0.1 to 1.5
 */
export function authenticityMultiplier(
	fakeFlags: number,
	verifiedFlags: number,
	receiptCount: number,
	hasExternalLinks: boolean,
): number {
	let multiplier = 1.0;
	multiplier -= fakeFlags * 0.05;
	multiplier += verifiedFlags * 0.03;
	if (receiptCount >= 3) multiplier += 0.1;
	if (hasExternalLinks) multiplier += 0.05;
	return Math.max(0.1, Math.min(1.5, multiplier));
}

/**
 * Freshness boost with smooth decay.
 * Range: 1.0 to 1.5
 */
export function freshnessBoost(createdAt: number): number {
	const ageHours = (Date.now() - createdAt) / (1000 * 60 * 60);
	if (ageHours < 24) return 1.5 - (0.3 * ageHours) / 24;
	if (ageHours < 168) return 1.2 - (0.1 * (ageHours - 24)) / 144;
	if (ageHours < 720) return 1.1 - (0.1 * (ageHours - 168)) / 552;
	return 1.0;
}

/**
 * Severity weight (light touch).
 * Maps community severity 1-5 to weight 1.0-1.25
 */
export function severityWeight(communitySeverity: number): number {
	return 1.0 + ((communitySeverity - 1) / 4) * 0.25;
}

/**
 * Calculate the composite Horror Score.
 */
export function calculateHorrorScore(story: {
	upvotes: number;
	downvotes: number;
	ripVotes: number;
	fakeFlags: number;
	verifiedFlags: number;
	receiptCount: number;
	hasExternalLinks: boolean;
	communitySeverity: number;
	createdAt: number;
}): number {
	const positiveVotes = story.upvotes + story.ripVotes;
	const totalVotes = positiveVotes + story.downvotes;

	const wilson = wilsonLowerBound(positiveVotes, totalVotes);
	const authenticity = authenticityMultiplier(
		story.fakeFlags,
		story.verifiedFlags,
		story.receiptCount,
		story.hasExternalLinks,
	);
	const freshness = freshnessBoost(story.createdAt);
	const severity = severityWeight(story.communitySeverity);

	return wilson * authenticity * freshness * severity;
}
