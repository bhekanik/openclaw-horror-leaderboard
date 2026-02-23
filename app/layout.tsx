import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ConvexClientProvider } from "@/components/layout/convex-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const crimsonPro = Crimson_Pro({
	variable: "--font-display",
	subsets: ["latin"],
	display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
	variable: "--font-body",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "OpenClaw Horror Stories - AI Horror Leaderboard",
		template: "%s | OpenClaw Horror Stories",
	},
	description:
		"The worst things OpenClaw has done to real people. Community-driven leaderboard of AI horror stories, backed by evidence.",
	icons: {
		icon: [
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		apple: "/apple-icon.png",
	},
	manifest: "/site.webmanifest",
	openGraph: {
		title: "OpenClaw Horror Stories",
		description: "Community-driven leaderboard of AI horror stories, backed by evidence.",
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "OpenClaw Horror Stories - The worst things AI has done to real people",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OpenClaw Horror Stories",
		description: "Community-driven leaderboard of AI horror stories, backed by evidence.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${crimsonPro.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-body min-h-screen flex flex-col`}
			>
				<ConvexClientProvider>
					<ThemeProvider>
						<TooltipProvider delayDuration={300}>
							<Header />
							<main className="flex-1 container mx-auto px-4 py-8">{children}</main>
							<Footer />
							<Toaster />
						</TooltipProvider>
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
