import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
	title: "About - OpenClaw Horror Stories",
	description:
		"What is OpenClaw Horror Stories? A community-driven leaderboard of AI horror stories.",
};

export default function AboutPage() {
	return (
		<div className="max-w-2xl mx-auto space-y-8">
			<h1 className="text-3xl font-bold font-display animate-fade-in-up">What is this?</h1>

			<section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "50ms" }}>
				<p className="text-muted-foreground">
					OpenClaw Horror Stories is a community-driven leaderboard of the worst things OpenClaw AI
					agents have done to real people. Think of it as a hall of infamy for AI gone wrong.
				</p>
				<p className="text-muted-foreground">
					Every story here is backed by evidence &mdash; screenshots, links, or transcripts that
					prove these incidents actually happened. No hearsay, no rumors, just receipts.
				</p>
			</section>

			<section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
				<h2 className="text-xl font-semibold font-display">How does the scoring work?</h2>
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

			<section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
				<h2 className="text-xl font-semibold font-display">How can I contribute?</h2>
				<ul className="space-y-2 text-muted-foreground list-disc list-inside">
					<li>Submit your own horror story with evidence (screenshots, links, or transcripts)</li>
					<li>Vote on stories to help the community surface the most impactful incidents</li>
					<li>Verify or flag stories to help maintain quality</li>
					<li>Comment to add context or additional evidence</li>
				</ul>
			</section>

			<section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
				<h2 className="text-xl font-semibold font-display">Categories</h2>
				<ul className="space-y-2 text-muted-foreground">
					{CATEGORIES.map((cat) => {
						const Icon = cat.icon;
						return (
							<li key={cat.value} className="flex items-start gap-2">
								<Icon className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
								<span>
									<strong>{cat.label}</strong> &mdash; {cat.description}
								</span>
							</li>
						);
					})}
				</ul>
			</section>

			<section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
				<h2 className="text-xl font-semibold font-display">Rules</h2>
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
