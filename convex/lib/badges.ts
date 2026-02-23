export type BadgeType = "survivor" | "witness" | "skeptic";

export interface BadgeCriteria {
	survivor: { storiesCount: number };
	witness: { verifiedVoteCount: number };
	skeptic: { fakeFlagCount: number };
}

export function checkBadges(
	currentBadges: string[],
	criteria: { storiesCount: number; verifiedVoteCount: number; fakeFlagCount: number },
): string[] {
	const newBadges = [...currentBadges];

	if (criteria.storiesCount >= 1 && !newBadges.includes("survivor")) {
		newBadges.push("survivor");
	}

	if (criteria.verifiedVoteCount >= 10 && !newBadges.includes("witness")) {
		newBadges.push("witness");
	}

	if (criteria.fakeFlagCount >= 10 && !newBadges.includes("skeptic")) {
		newBadges.push("skeptic");
	}

	return newBadges;
}
