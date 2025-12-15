import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "./_components/Footer";
import Script from "next/script";

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
				url: "/banner.webp",
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
		images: ["/banner.webp"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const ga =
		process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ??
		process.env.GOOGLE_ANALYTICS_ID;
	return (
		<html lang="en">
			<head>
				<meta
					name="google-adsense-account"
					content="ca-pub-9815804917269409"
				></meta>
				{/* Preload main banner used in header / social preview to improve LCP */}
				<link rel="preload" as="image" href="/banner.webp" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${masque.variable} antialiased `}
			>
				{children}

				{/* Google Analytics is consent-gated: we expose a loader function and only
					inject the real gtag.js when the site has explicit analytics consent.
					This prevents GA from loading on first view and reduces initial JS execution. */}
				{ga && (
					<>
						<Script id="gtag-consent-gate" strategy="lazyOnload">
							{`
								(function(){
									window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);} 
									window.gtag = window.gtag || gtag;

									// Loader that injects the real gtag.js and initializes it.
									window.__loadGtag = function(){
										if (window.__gtag_loaded) return;
										window.__gtag_loaded = true;
										var s = document.createElement('script');
										s.src = 'https://www.googletagmanager.com/gtag/js?id=${ga}';
										s.async = true;
										s.onload = function(){
											try{
												gtag('js', new Date());
												gtag('config', '${ga}', { send_page_view: false, anonymize_ip: true });
											}catch(e){}
										};
										document.head.appendChild(s);
									};

									// Auto-load if prior consent was saved
									try{
										if (localStorage && localStorage.getItem('wheel.analytics') === 'granted'){
											window.__loadGtag();
										}
									}catch(e){}
								})();
							`}
						</Script>
					</>
				)}

				<Footer />
			</body>
		</html>
	);
}
