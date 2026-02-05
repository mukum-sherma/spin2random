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
		default: "Spin2Random — Spin the Wheel & Pick Random Winners",
		template: "%s | Spin2Random",
	},
	description:
		"Spin2Random lets you spin a customizable wheel to randomly choose winners — fast, fair, and mobile-friendly for events, classrooms, and giveaways.",
	keywords: [
		"spin the wheel",
		"pick random winners",
		"giveaway wheel",
		"prize wheel",
		"online spinner",
		"random picker",
		"spin2random",
		"wheel spinner",
		"team picker",
	],
	// alternates: {
	// 	canonical: "https://spin2random.com",
	// },
	openGraph: {
		title: "Spin2Random — Spin the Wheel & Pick Random Winners",
		description:
			"Spin2Random lets you create shareable wheels, spin the wheel live, and randomly choose winners for giveaways, raffles, and classroom games.",
		url: "https://spin2random.com",
		siteName: "Spin2Random",
		images: [
			{
				url: "/banner.webp",
				width: 1200,
				height: 630,
				alt: "Spin2Random preview",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Spin2Random — Spin the Wheel & Pick Random Winners",
		description:
			"Spin the wheel, pick winners at random, and run fair, engaging spins for any event.",
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
				{/* Load AdSense non-blocking (lazy) */}
				<Script
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9815804917269409"
					strategy="lazyOnload"
					crossOrigin="anonymous"
				/>
				{/* Preload main banner used in header / social preview to improve LCP */}
				<link rel="preload" as="image" href="/banner.webp" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${masque.variable} antialiased `}
			>
				<div className="flex min-h-screen flex-col">
					<main className="flex-1">{children}</main>

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
				</div>
			</body>
		</html>
	);
}
