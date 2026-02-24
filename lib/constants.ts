import type { LucideIcon } from "lucide-react";
import {
	CircleX,
	DollarSign,
	Eye,
	Fingerprint,
	Flame,
	Ghost,
	HelpCircle,
	ShieldAlert,
	Skull,
	Trophy,
} from "lucide-react";

export interface CategoryDef {
	value: string;
	label: string;
	description: string;
	icon: LucideIcon;
}

export const CATEGORIES: CategoryDef[] = [
	{
		value: "rogue",
		label: "It went rogue",
		description: "Agent acted against instructions",
		icon: Flame,
	},
	{
		value: "cost_money",
		label: "It cost me money",
		description: "Financial damage from agent actions",
		icon: DollarSign,
	},
	{
		value: "scared_me",
		label: "It scared me",
		description: "Genuinely unsettling behavior",
		icon: Ghost,
	},
	{
		value: "security",
		label: "Security nightmare",
		description: "Data exposure or security breaches",
		icon: ShieldAlert,
	},
	{ value: "epic_fail", label: "Epic fail", description: "Spectacular failures", icon: CircleX },
	{
		value: "identity_crisis",
		label: "Identity crisis",
		description: "Agent confused about what it is",
		icon: Fingerprint,
	},
	{
		value: "almost_catastrophic",
		label: "Almost catastrophic",
		description: "Near-misses that could have been devastating",
		icon: Skull,
	},
];

export const CATEGORY_MAP: Record<string, CategoryDef> = Object.fromEntries(
	CATEGORIES.map((c) => [c.value, c]),
);

export interface BadgeDef {
	label: string;
	icon: LucideIcon;
}

export const BADGE_MAP: Record<string, BadgeDef> = {
	survivor: { label: "Survivor", icon: Trophy },
	witness: { label: "Witness", icon: Eye },
	skeptic: { label: "Skeptic", icon: HelpCircle },
};

export const SEVERITY_LABELS = [
	"Minor annoyance",
	"Problematic",
	"Serious",
	"Severe",
	"Catastrophic",
];
