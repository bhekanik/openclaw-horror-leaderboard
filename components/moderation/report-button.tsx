"use client";

import { useMutation } from "convex/react";
import { Flag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const REPORT_REASONS = [
	{ value: "spam", label: "Spam" },
	{ value: "fake_story", label: "Fake story" },
	{ value: "harassment", label: "Harassment" },
	{ value: "inappropriate", label: "Inappropriate" },
	{ value: "duplicate", label: "Duplicate" },
	{ value: "other", label: "Other" },
];

interface ReportButtonProps {
	storyId?: any;
	commentId?: any;
}

export function ReportButton({ storyId, commentId }: ReportButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedReason, setSelectedReason] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const createReport = useMutation(api.reports.create);

	const handleSubmit = async () => {
		if (!selectedReason) return;
		setIsSubmitting(true);
		try {
			await createReport({
				...(storyId ? { storyId } : {}),
				...(commentId ? { commentId } : {}),
				reason: selectedReason,
			});
			setIsOpen(false);
			setSelectedReason(null);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) {
		return (
			<Button
				variant="ghost"
				size="sm"
				className="text-muted-foreground"
				onClick={() => setIsOpen(true)}
			>
				<Flag className="h-3 w-3 mr-1" />
				Report
			</Button>
		);
	}

	return (
		<div className="border rounded-md p-4 space-y-3">
			<p className="text-sm font-medium">Select a reason for reporting:</p>
			<div className="flex flex-wrap gap-2">
				{REPORT_REASONS.map((reason) => (
					<Button
						key={reason.value}
						variant={selectedReason === reason.value ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedReason(reason.value)}
					>
						{reason.label}
					</Button>
				))}
			</div>
			<div className="flex gap-2">
				<Button size="sm" disabled={!selectedReason || isSubmitting} onClick={handleSubmit}>
					Submit Report
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => {
						setIsOpen(false);
						setSelectedReason(null);
					}}
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}
