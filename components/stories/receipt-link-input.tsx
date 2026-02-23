"use client";

import { Link2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReceiptLinkInputProps {
	links: string[];
	onChange: (links: string[]) => void;
}

export function ReceiptLinkInput({ links, onChange }: ReceiptLinkInputProps) {
	const [url, setUrl] = useState("");

	function handleAdd() {
		const trimmed = url.trim();
		if (!trimmed) return;
		onChange([...links, trimmed]);
		setUrl("");
	}

	function handleRemove(index: number) {
		onChange(links.filter((_, i) => i !== index));
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input
					placeholder="https://... paste evidence URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					}}
				/>
				<Button type="button" variant="outline" size="sm" onClick={handleAdd}>
					<Link2 className="mr-1 h-4 w-4" />
					Add
				</Button>
			</div>
			{links.length > 0 && (
				<ul className="space-y-1">
					{links.map((link, i) => (
						<li key={link} className="flex items-center gap-2 text-sm">
							<Link2 className="h-3 w-3 text-muted-foreground shrink-0" />
							<span className="truncate flex-1">{link}</span>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0"
								onClick={() => handleRemove(i)}
								aria-label="Remove"
							>
								<X className="h-3 w-3" />
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
