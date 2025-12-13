// Simple wheel worker scaffold
// Listens for messages with {type: 'spin', payload: {...}} and responds with a result
self.addEventListener("message", (event) => {
	const { data } = event;
	if (!data || !data.type) return;

	switch (data.type) {
		case "spin": {
			const { seed = Math.random(), partitions = 8 } = data.payload || {};
			// Simple deterministic-ish spin result based on seed
			const r = Math.abs(Math.sin(seed * 1e3)) * 10000;
			const index = Math.floor(r) % Math.max(1, partitions);
			// Simulate some CPU work (placeholder)
			let dummy = 0;
			for (let i = 0; i < 1000; i++) dummy += Math.sqrt((i + 1) * (seed || 1));
			self.postMessage({ type: "spinResult", payload: { index, dummy } });
			break;
		}
		case "ping": {
			self.postMessage({ type: "pong" });
			break;
		}
		default:
			// ignore
			break;
	}
});

// close worker gracefully
self.addEventListener("close", () => {
	try {
		self.close && self.close();
	} catch (e) {}
});
