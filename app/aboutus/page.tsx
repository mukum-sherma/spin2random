import type { Metadata } from "next";
import NavbarBanner from "../_components/navbar-banner";
import localFont from "next/font/local";

const adalima = localFont({
	src: "../_fonts/adalima.ttf",
	variable: "--font-adalima",
});

export const metadata: Metadata = {
	title: "About SpinWheelQuiz — Online Wheel Spinner & Team Picker Wheel",
	description:
		"Learn how SpinWheelQuiz provides a customizable spinner, online wheel spinner, team picker wheel, and wheel maker for giveaways, raffle wheel online draws, gamified quiz activities and random team generator needs.",
	keywords: [
		"customizable spinner",
		"random team generator",
		"gamified quiz",
		"spin wheel for zoom games",
		"wheel picker",
		"online wheel spinner",
		"yes or no wheel spinner",
		"online prize wheel",
		"team picker wheel",
		"wheel of names alternative",
		"random picker wheel",
		"raffle wheel online",
		"prize wheel",
		"name spinner",
		"giveaway wheel",
		"wheel maker",
		"online spinner",
	],
	openGraph: {
		title: "About SpinWheelQuiz — Online Wheel Spinner & Prize Wheel Maker",
		description:
			"Discover our customizable spinner, team picker wheel, online prize wheel, and wheel maker — perfect for raffle wheel online, random team generator, gamified quiz, and spin wheel for zoom games.",
		images: ["/images/img1.jpg"],
	},
};

export default function AboutUsPage() {
	return (
		<div>
			<NavbarBanner />
			<div className="min-h-screen py-12 px-4">
				<div className="container mx-auto max-w-4xl">
					<h1
						className={`text-2xl text-slate-600  tracking-wider mb-6 ${adalima.className}`}
					>
						About SpinWheelQuiz — Online Wheel Spinner & Customizable Spinner
					</h1>

					<div className="space-y-6 text-slate-700 leading-relaxed">
						<p className="text-lg">
							Welcome to <strong>SpinWheelQuiz</strong> — a playful, easy-to-use
							online wheel spinner and wheel maker for creating customizable
							spin wheels. Use it to run raffles, classroom activities,
							team-building events, giveaways, gamified quiz games, or as a
							random team generator and yes or no wheel spinner for quick
							decisions.
						</p>

						<h2
							className={`text-xl tracking-wide font-medium text-slate-600 mb-4 ${adalima.className}`}
						>
							Our Mission
						</h2>
						<p>
							We want to make spinning a prize wheel delightful and simple.
							SpinWheelQuiz is a fast online spinner and team picker wheel that
							focuses on quick setup, attractive visuals, and configurable
							behavior (sounds, timers, and winner selection). Use it as a wheel
							of names alternative, name spinner, or giveaway wheel — perfect
							for raffle wheel online events and spin wheel for zoom games.
						</p>

						<h2
							className={`text-xl tracking-wide font-medium text-slate-600 mb-4 ${adalima.className}`}
						>
							What We Offer
						</h2>
						<p>
							Our customizable spinner and online prize wheel provide a growing
							set of features to make event spinning flexible, fair and visually
							engaging — ideal for use as a random picker wheel or wheel picker:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>
								<strong>Custom backgrounds:</strong> Choose a full-screen page
								background or a dedicated wheel background image so the stage
								matches your event.
							</li>
							<li>
								<strong>Per-entry customization:</strong> Assign a custom color
								or upload an image per participant so each slice can carry a
								unique look.
							</li>
							<li>
								<strong>Adjustable weights & percentages:</strong> Give entries
								different chances by editing their weight (0–200). The UI shows
								the corresponding percentage share so odds are clear.
							</li>
							<li>
								<strong>Drag to reorder:</strong> Reposition entries using the
								drag handle in Advanced mode to change visual ordering without
								losing assigned images or colors.
							</li>
							<li>
								<strong>Sound & timing:</strong> Pick spin and winning sounds
								from the library or upload your own, and configure timers and
								spin behavior for a polished reveal.
							</li>
							<li>
								<strong>Share & Export:</strong> Share your wheel link or export
								results for record-keeping and replay.
							</li>
						</ul>

						<h2
							className={`text-xl tracking-wide font-medium text-slate-600 mb-4 ${adalima.className}`}
						>
							Why Choose SpinWheelQuiz?
						</h2>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>
								<strong>Fun & Engaging:</strong> Designed to capture attention
								at live events and in classrooms.
							</li>
							<li>
								<strong>Highly Customizable:</strong> Tailor the wheel to your
								brand or event.
							</li>
							<li>
								<strong>Mobile-Friendly:</strong> Works great on phones and
								tablets.
							</li>
							<li>
								<strong>Accessible:</strong> Simple controls and clear visuals
								make it easy for anyone to use.
							</li>
						</ul>

						<h2
							className={`text-xl tracking-wide font-medium text-slate-600 mb-4 ${adalima.className}`}
						>
							Our Commitment
						</h2>
						<p>
							We continuously improve SpinWheelQuiz based on user feedback. If
							you have ideas or feature requests, please get in touch via the
							contact page.
						</p>

						<p className="mt-8 text-center italic">
							Thank you for using SpinWheelQuiz — let the best slice win!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
