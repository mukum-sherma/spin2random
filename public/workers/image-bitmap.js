self.onmessage = async (event) => {
	const data = event?.data || {};
	const id = data.id;
	const src = data.src;
	if (!id || !src) {
		return;
	}

	try {
		const response = await fetch(src, { mode: "cors" });
		const blob = await response.blob();
		const bitmap = await createImageBitmap(blob);
		self.postMessage({ id, bitmap }, [bitmap]);
	} catch (err) {
		const message = err && err.message ? err.message : String(err);
		self.postMessage({ id, error: message });
	}
};
