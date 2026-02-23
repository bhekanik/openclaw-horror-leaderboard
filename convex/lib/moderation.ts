/**
 * Determines if a story should be auto-hidden based on community flags.
 * Stories with >10 fake flags AND <5 verified flags should be hidden.
 */
export function shouldAutoHide(fakeFlags: number, verifiedFlags: number): boolean {
	return fakeFlags > 10 && verifiedFlags < 5;
}
