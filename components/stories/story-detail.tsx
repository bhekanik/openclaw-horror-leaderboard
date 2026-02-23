"use client";

import { ExternalLink, FileText, Link2 } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CATEGORY_MAP: Record<string, { label: string; emoji: string }> = {
	rogue: { label: "It went rogue", emoji: "\u{1F525}" },
	cost_money: { label: "It cost me money", emoji: "\u{1F4B8}" },
	scared_me: { label: "It scared me", emoji: "\u{1F631}" },
	security: { label: "Security nightmare", emoji: "\u{1F513}" },
	epic_fail: { label: "Epic fail", emoji: "\u{1F926}" },
	identity_crisis: { label: "Identity crisis", emoji: "\u{1F3AD}" },
	almost_catastrophic: { label: "Almost catastrophic", emoji: "\u{1F480}" },
};

interface Receipt {
	_id: any;
	type: "screenshot" | "link" | "transcript";
	url?: string;
	content?: string;
	storageId?: any;
	caption?: string;
}

interface StoryDetailProps {
	story: {
		_id: any;
		title: string;
		body: string;
		category: string;
		severity: number;
		createdAt: number;
		tags: string[];
		incidentDate?: string;
		openclawVersion?: string;
		upvotes: number;
		downvotes: number;
		horrorScore: number;
	};
	receipts: Receipt[];
	author: {
		_id: any;
		username?: string;
		karma?: number;
	} | null;
}

export function StoryDetail({ story, receipts, author }: StoryDetailProps) {
	const cat = CATEGORY_MAP[story.category];
	const timeAgo = formatTimeAgo(story.createdAt);

	return (
		<article className="space-y-6">
			{/* Header */}
			<div className="space-y-3">
				<div className="flex items-center gap-2 flex-wrap">
					{cat && (
						<Badge variant="secondary">
							{cat.emoji} {cat.label}
						</Badge>
					)}
					<Badge variant="outline">Severity: {story.severity}/5</Badge>
					{story.openclawVersion && <Badge variant="outline">v{story.openclawVersion}</Badge>}
				</div>
				<h1 className="text-3xl font-bold">{story.title}</h1>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					{author && (
						<>
							<span>by</span>
							<Link
								href={`/user/${author.username ?? "unknown"}`}
								className="text-primary hover:underline"
							>
								{author.username ?? "Anonymous"}
							</Link>
						</>
					)}
					<span>&middot;</span>
					<span>{timeAgo}</span>
					{story.incidentDate && (
						<>
							<span>&middot;</span>
							<span>Incident: {story.incidentDate}</span>
						</>
					)}
				</div>
			</div>

			<Separator />

			{/* Body */}
			<div className="prose prose-invert max-w-none">
				<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
					{story.body}
				</Markdown>
			</div>

			{/* Tags */}
			{story.tags.length > 0 && (
				<div className="flex gap-2 flex-wrap">
					{story.tags.map((tag) => (
						<Badge key={tag} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
			)}

			<Separator />

			{/* Receipts */}
			{receipts.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Evidence</h2>
					<div className="space-y-3">
						{receipts.map((receipt) => (
							<ReceiptItem key={receipt._id} receipt={receipt} />
						))}
					</div>
				</div>
			)}
		</article>
	);
}

function ReceiptItem({ receipt }: { receipt: Receipt }) {
	if (receipt.type === "link" && receipt.url) {
		return (
			<Card>
				<CardContent className="flex items-center gap-3 py-3">
					<Link2 className="h-5 w-5 text-muted-foreground shrink-0" />
					<a
						href={receipt.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-primary hover:underline truncate flex-1"
					>
						{receipt.url}
					</a>
					<ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
				</CardContent>
			</Card>
		);
	}

	if (receipt.type === "transcript" && receipt.content) {
		return (
			<Card>
				<CardContent className="py-3">
					<div className="flex items-center gap-2 mb-2">
						<FileText className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm font-medium">Transcript</span>
					</div>
					<pre className="text-sm bg-muted/50 p-3 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
						{receipt.content}
					</pre>
				</CardContent>
			</Card>
		);
	}

	return null;
}

function formatTimeAgo(timestamp: number): string {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "just now";
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
	return new Date(timestamp).toLocaleDateString();
}
