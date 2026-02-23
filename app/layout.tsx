import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/components/layout/convex-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "OpenClaw Horror Stories - AI Horror Leaderboard",
		template: "%s | OpenClaw Horror Stories",
	},
	description:
		"The worst things OpenClaw has done to real people. Community-driven leaderboard of AI horror stories, backed by evidence.",
	openGraph: {
		title: "OpenClaw Horror Stories",
		description: "Community-driven leaderboard of AI horror stories, backed by evidence.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<ConvexClientProvider>
					<ThemeProvider>
						<Header />
						<main className="flex-1 container mx-auto px-4 py-8">{children}</main>
						<Footer />
						<Toaster />
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
