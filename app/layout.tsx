import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "./_components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const masque = localFont({
	src: "./_fonts/masque.ttf",
	variable: "--font-masque",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "SpinWheelQuiz",
		template: "%s | SpinWheelQuiz",
	},
	description:
		"SpinWheelQuiz — customizable online spin wheel for quizzes, raffles, classrooms and giveaways. Fast, mobile-friendly, configurable sounds and timers.",
	openGraph: {
		title: "SpinWheelQuiz — Online Spin Wheel",
		description:
			"Create and customize an online spin wheel with backgrounds, sounds and timers. Great for events, classrooms and giveaways.",
		url: "https://spinwheelquiz.com",
		siteName: "SpinWheelQuiz",
		images: [
			{
				url: "/banner.png",
				width: 1200,
				height: 630,
				alt: "SpinWheelQuiz preview",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "SpinWheelQuiz",
		description:
			"SpinWheelQuiz — customizable online spin wheel for quizzes, raffles and classroom picks.",
		images: ["/banner.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${masque.variable} antialiased `}
			>
				{children}
			</body>
			<Footer />
		</html>
	);
}
