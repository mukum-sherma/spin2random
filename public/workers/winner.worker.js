// Lightweight worker to determine winning partition index given weights and a rotation
let precomputed = null;

function binarySearchStart(starts, value) {
	let lo = 0;
	let hi = starts.length - 1;
	let idx = 0;
	while (lo <= hi) {
		const mid = (lo + hi) >> 1;
		if (starts[mid] <= value) {
			idx = mid;
			lo = mid + 1;
		} else {
			hi = mid - 1;
		}
	}
	return idx;
}

self.onmessage = function (e) {
	try {
		const msg = e.data || {};
		if (msg.type === "precompute") {
			const starts = Array.isArray(msg.starts) ? msg.starts : [];
			const total = Number(msg.total) || 0;
			precomputed = { starts: starts.slice(), total };
			return;
		}

		if (msg.type === "determine") {
			const rotation = Number(msg.rotation) || 0;

			// Prefer precomputed starts when available
			if (
				precomputed &&
				Array.isArray(precomputed.starts) &&
				precomputed.starts.length > 0
			) {
				const adjusted = (360 - (rotation % 360)) % 360;
				const starts = precomputed.starts;
				const idx = binarySearchStart(starts, adjusted);
				self.postMessage({ id: msg.id, winner: idx });
				return;
			}

			// Fallback: compute from provided weights if available
			const weights = Array.isArray(msg.weights) ? msg.weights : [];
			const total = Math.max(
				1,
				weights.reduce(function (a, b) {
					return a + (Number(b) || 0);
				}, 0)
			);

			// Convert rotation so arrow-right (0deg) points at wheel
			var adjusted = (360 - (rotation % 360)) % 360;

			var acc = 0;
			var winner = 0;
			for (var i = 0; i < weights.length; i++) {
				var segDeg = (Number(weights[i] || 1) / total) * 360;
				if (adjusted >= acc && adjusted < acc + segDeg) {
					winner = i;
					break;
				}
				acc += segDeg;
			}

			self.postMessage({ id: msg.id, winner: winner });
		}
	} catch (err) {
		// best-effort: don't crash worker
		try {
			self.postMessage({
				id: (e.data && e.data.id) || null,
				error: String(err),
			});
		} catch {}
	}
};
