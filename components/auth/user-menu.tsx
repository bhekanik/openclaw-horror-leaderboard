"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
	user: {
		username?: string;
		email?: string;
		avatarUrl?: string;
	};
}

export function UserMenu({ user }: UserMenuProps) {
	const { signOut } = useAuthActions();
	const displayName = user.username || user.email || "User";
	const initials = displayName.slice(0, 2).toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarFallback className="text-xs">{initials}</AvatarFallback>
					</Avatar>
					<span className="text-sm hidden sm:inline">{displayName}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{user.username && (
					<DropdownMenuItem asChild>
						<Link href={`/user/${user.username}`}>
							<User className="mr-2 h-4 w-4" />
							Profile
						</Link>
					</DropdownMenuItem>
				)}
				{!user.username && (
					<DropdownMenuItem asChild>
						<Link href="/user/me">
							<User className="mr-2 h-4 w-4" />
							Profile
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => void signOut()}>
					<LogOut className="mr-2 h-4 w-4" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
