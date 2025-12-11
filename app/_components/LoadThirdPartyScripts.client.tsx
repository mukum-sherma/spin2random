"use client";

import { useEffect, useCallback } from "react";

type RIC = (cb: () => void, opts?: { timeout?: number }) => number | void;

function runWhenIdle(fn: () => void) {
	if (typeof window === "undefined") return;
	const win = window as unknown as { requestIdleCallback?: RIC };
	const ric = win.requestIdleCallback;
	if (ric) {
		ric(fn, { timeout: 2000 });
	} else {
		setTimeout(fn, 2000);
	}
}

function hasConsentFor(key: string) {
	try {
		return localStorage.getItem(key) === "1";
	} catch {
		return false;
	}
}

export default function LoadThirdPartyScripts({ gaId }: { gaId?: string }) {
	const injectAds = useCallback(() => {
		try {
			const a = document.createElement("script");
			a.async = true;
			a.crossOrigin = "anonymous";
			a.src =
				"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9815804917269409";
			document.head.appendChild(a);
		} catch {
			// ignore
		}
	}, []);

	const injectAnalytics = useCallback((id: string) => {
		try {
			const s1 = document.createElement("script");
			s1.async = true;
			s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
			document.head.appendChild(s1);

			const s2 = document.createElement("script");
			s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}', { send_page_view: false });`;
			document.head.appendChild(s2);
		} catch {
			// ignore
		}
	}, []);

	useEffect(() => {
		const tryLoad = () => {
			if (hasConsentFor("swq_consent_ads")) injectAds();
			if (gaId && hasConsentFor("swq_consent_analytics")) injectAnalytics(gaId);
		};

		runWhenIdle(() => {
			tryLoad();
		});

		const onConsent = () => {
			tryLoad();
		};
		window.addEventListener("swq-consent-changed", onConsent);

		return () => window.removeEventListener("swq-consent-changed", onConsent);
	}, [gaId, injectAds, injectAnalytics]);

	return null;
}
