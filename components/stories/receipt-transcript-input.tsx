"use client";

import { Textarea } from "@/components/ui/textarea";

interface ReceiptTranscriptInputProps {
	value: string;
	onChange: (value: string) => void;
}

const MAX_CHARS = 50000;

export function ReceiptTranscriptInput({ value, onChange }: ReceiptTranscriptInputProps) {
	return (
		<div className="space-y-1">
			<Textarea
				placeholder="Paste conversation transcript or log output..."
				value={value}
				onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
				rows={8}
				className="font-mono text-sm"
			/>
			<p className="text-xs text-muted-foreground text-right">
				{value.length} / {MAX_CHARS.toLocaleString()}
			</p>
		</div>
	);
}
