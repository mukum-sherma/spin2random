import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "./_components/Footer";
import LoadThirdPartyScripts from "./_components/LoadThirdPartyScripts.client";
// Google Analytics will be injected lazily by a client loader to avoid blocking LCP

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
		default: "SpinWheelQuiz — Online Random Winner Picker",
		template: "%s | SpinWheelQuiz",
	},
	description:
		"Randomly choose winners with a customizable spin wheel — fast, fair and mobile-friendly, with images, sounds and timers.",
	openGraph: {
		title: "SpinWheelQuiz — Online Spin Wheel",
		description:
			"Randomly select winners using a customizable spin wheel — fast, fair and mobile-friendly for classrooms, events and giveaways.",
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
			"SpinWheelQuiz — randomly select winners with a customizable, shareable spin wheel for quizzes, classrooms and giveaways.",
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
			<head>
				<meta
					name="google-adsense-account"
					content="ca-pub-9815804917269409"
				></meta>
				{/* Preload main banner used in header / social preview to improve LCP */}
				<link rel="preload" as="image" href="/banner.png" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${masque.variable} antialiased `}
			>
				{children}
				{/* Inject third-party scripts after initial load to protect LCP */}
				<LoadThirdPartyScripts gaId={process.env.GOOGLE_ANALYTICS_ID} />
				<Footer />
			</body>
		</html>
	);
}
