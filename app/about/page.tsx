import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About - OpenClaw Horror Stories",
	description:
		"What is OpenClaw Horror Stories? A community-driven leaderboard of AI horror stories.",
};

export default function AboutPage() {
	return (
		<div className="max-w-2xl mx-auto space-y-8">
			<h1 className="text-3xl font-bold">What is this?</h1>

			<section className="space-y-4">
				<p className="text-muted-foreground">
					OpenClaw Horror Stories is a community-driven leaderboard of the worst things OpenClaw AI
					agents have done to real people. Think of it as a hall of infamy for AI gone wrong.
				</p>
				<p className="text-muted-foreground">
					Every story here is backed by evidence &mdash; screenshots, links, or transcripts that
					prove these incidents actually happened. No hearsay, no rumors, just receipts.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">How does the scoring work?</h2>
				<p className="text-muted-foreground">
					Stories are ranked using the Horror Score&trade; &mdash; a composite metric that combines
					community votes (using Wilson score lower bound for statistical confidence), receipt
					authenticity (verified vs. flagged as fake), freshness, and incident severity.
				</p>
				<p className="text-muted-foreground">
					The result: stories that are well-evidenced, community-verified, and genuinely horrifying
					rise to the top.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">How can I contribute?</h2>
				<ul className="space-y-2 text-muted-foreground list-disc list-inside">
					<li>Submit your own horror story with evidence (screenshots, links, or transcripts)</li>
					<li>Vote on stories to help the community surface the most impactful incidents</li>
					<li>Verify or flag stories to help maintain quality</li>
					<li>Comment to add context or additional evidence</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Categories</h2>
				<ul className="space-y-2 text-muted-foreground list-disc list-inside">
					<li>
						<strong>It went rogue</strong> &mdash; Agent acted against instructions
					</li>
					<li>
						<strong>It cost me money</strong> &mdash; Financial damage from agent actions
					</li>
					<li>
						<strong>It scared me</strong> &mdash; Genuinely unsettling behavior
					</li>
					<li>
						<strong>Security nightmare</strong> &mdash; Data exposure or security breaches
					</li>
					<li>
						<strong>Epic fail</strong> &mdash; Spectacular failures
					</li>
					<li>
						<strong>Identity crisis</strong> &mdash; Agent confused about what it is
					</li>
					<li>
						<strong>Almost catastrophic</strong> &mdash; Near-misses that could have been
						devastating
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Rules</h2>
				<ul className="space-y-2 text-muted-foreground list-disc list-inside">
					<li>All stories must include at least one receipt (evidence)</li>
					<li>No personally identifiable information of third parties</li>
					<li>
						Stories with more than 10 fake flags and fewer than 5 verifications are auto-hidden
					</li>
					<li>Be respectful in comments</li>
				</ul>
			</section>
		</div>
	);
}
