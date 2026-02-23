"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, SEVERITY_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { ReceiptLinkInput } from "./receipt-link-input";
import { ReceiptTranscriptInput } from "./receipt-transcript-input";

export function StoryForm() {
	const createStory = useMutation(api.stories.create);
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [category, setCategory] = useState("");
	const [severity, setSeverity] = useState(3);
	const [incidentDate, setIncidentDate] = useState("");
	const [openclawVersion, setOpenclawVersion] = useState("");
	const [tags, setTags] = useState("");
	const [links, setLinks] = useState<string[]>([]);
	const [transcript, setTranscript] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	function validate(): string | null {
		if (!title.trim()) return "Title is required";
		if (title.length > 200) return "Title must be under 200 characters";
		if (!body.trim()) return "Story is required";
		if (body.length > 10000) return "Story must be under 10,000 characters";
		if (!category) return "Category is required";
		if (links.length === 0 && !transcript.trim()) {
			return "At least one receipt is required (link or transcript)";
		}
		return null;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		setLoading(true);
		try {
			const receipts: Array<{
				type: "screenshot" | "link" | "transcript";
				url?: string;
				content?: string;
			}> = [];

			for (const url of links) {
				receipts.push({ type: "link", url });
			}
			if (transcript.trim()) {
				receipts.push({ type: "transcript", content: transcript });
			}

			const tagList = tags
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean)
				.slice(0, 5);

			const storyId = await createStory({
				title: title.trim(),
				body,
				category,
				severity,
				incidentDate: incidentDate || undefined,
				openclawVersion: openclawVersion || undefined,
				tags: tagList,
				receipts,
			});

			router.push(`/story/${storyId}`);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit story");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-display">Submit Your Horror Story</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Title */}
					<div className="space-y-2">
						<Label htmlFor="story-title">Title</Label>
						<Input
							id="story-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What happened in one sentence..."
							maxLength={200}
						/>
						<p className="text-xs text-muted-foreground text-right">{title.length}/200</p>
					</div>

					{/* Body */}
					<div className="space-y-2">
						<Label htmlFor="story-body">Your Story</Label>
						<Textarea
							id="story-body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							placeholder="Tell us what happened. Markdown supported."
							rows={10}
							maxLength={10000}
						/>
						<p className="text-xs text-muted-foreground text-right">{body.length}/10,000</p>
					</div>

					{/* Category */}
					<div className="space-y-2">
						<Label>Category</Label>
						<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
							{CATEGORIES.map((cat) => {
								const Icon = cat.icon;
								return (
									<button
										key={cat.value}
										type="button"
										onClick={() => setCategory(cat.value)}
										className={`flex items-center gap-2 rounded-md border p-2 min-h-11 text-sm transition-colors ${
											category === cat.value
												? "border-primary bg-primary/10 text-primary"
												: "border-border hover:border-primary/50"
										}`}
									>
										<Icon className="h-4 w-4 shrink-0" />
										<span>{cat.label}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Severity */}
					<div className="space-y-2">
						<Label>
							Severity: {severity}/5 — {SEVERITY_LABELS[severity - 1]}
						</Label>
						<Slider
							value={[severity]}
							onValueChange={([v]) => setSeverity(v)}
							min={1}
							max={5}
							step={1}
						/>
					</div>

					{/* Receipts */}
					<div className="space-y-2">
						<Label>Evidence (Receipts)</Label>
						<p className="text-xs text-muted-foreground">
							At least one piece of evidence is required
						</p>
						<Tabs defaultValue="links">
							<TabsList>
								<TabsTrigger value="screenshots">Screenshots</TabsTrigger>
								<TabsTrigger value="links">Links</TabsTrigger>
								<TabsTrigger value="transcript">Transcript</TabsTrigger>
							</TabsList>
							<TabsContent value="screenshots" className="mt-2">
								<p className="text-sm text-muted-foreground">
									Screenshot upload coming soon. Use links or transcripts for now.
								</p>
							</TabsContent>
							<TabsContent value="links" className="mt-2">
								<ReceiptLinkInput links={links} onChange={setLinks} />
							</TabsContent>
							<TabsContent value="transcript" className="mt-2">
								<ReceiptTranscriptInput value={transcript} onChange={setTranscript} />
							</TabsContent>
						</Tabs>
					</div>

					{/* Optional fields */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="incident-date">Incident Date</Label>
							<Input
								id="incident-date"
								type="date"
								value={incidentDate}
								onChange={(e) => setIncidentDate(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="openclaw-version">OpenClaw Version</Label>
							<Input
								id="openclaw-version"
								value={openclawVersion}
								onChange={(e) => setOpenclawVersion(e.target.value)}
								placeholder="e.g., 0.2.1"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="story-tags">Tags (comma-separated, max 5)</Label>
						<Input
							id="story-tags"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							placeholder="e.g., phishing, data-loss, autonomous"
						/>
					</div>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<Button type="submit" className="w-full" size="lg" disabled={loading}>
						{loading ? "Submitting..." : "Submit Story"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
