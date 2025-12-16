// Compute-only worker for spin physics
// Accepts messages:
// { type: 'start', id: string, params: { startRotation, timerDuration, seed } , weights: number[] }
// Posts messages:
// { type: 'tick', id, rotation, timestamp }
// { type: 'done', id, finalRotation }

self.onmessage = function (e) {
	const msg = e.data;
	if (!msg || !msg.type) return;
	if (msg.type === "start") {
		const id = msg.id;
		const params = msg.params || {};
		const weights = msg.weights || [];
		const startRotation = params.startRotation || 0;
		const timerDuration = Math.max(
			2,
			Math.min(40, Math.round(params.timerDuration || 10))
		);

		// Phase map copied from main code
		const phaseMap = [
			[1, 1, 1],
			[1, 2, 1],
			[2, 2, 2],
			[2, 3, 2],
			[2, 4, 2],
			[3, 4, 3],
			[3, 4, 3],
			[3, 4, 3],
			[3, 5, 4],
			[3, 5, 5],
			[3, 5, 6],
		];

		function getPhaseForSeconds(s) {
			if (s <= 2) return phaseMap[0];
			if (s === 3) return phaseMap[1];
			if (s === 4) return phaseMap[2];
			if (s === 5) return phaseMap[3];
			if (s === 6) return phaseMap[4];
			if (s === 7) return phaseMap[5];
			if (s === 8) return phaseMap[6];
			if (s === 9) return phaseMap[7];
			if (s >= 10 && s <= 14) return phaseMap[8];
			if (s >= 15 && s <= 19) return phaseMap[9];
			return phaseMap[10];
		}

		const [accelS, baseDecelS, extraSlowS] = getPhaseForSeconds(timerDuration);
		const accelDuration = accelS * 1000;
		const baseDecel = baseDecelS * 1000;
		const extraSlow = extraSlowS * 1000;
		const plannedDecel = baseDecel + extraSlow;

		const duration = Math.max(500, params.duration || timerDuration * 1000);
		const spins = 5 + Math.floor(Math.random() * 5);
		const randomDegree = Math.random() * 360;
		const totalRotation = spins * 360 + randomDegree;

		const rotationDuringAccel = totalRotation * 0.5;
		const rotationDuringDecel = totalRotation * 0.5;

		// approximate peak speed per ms
		const peakSpeedPerMs = rotationDuringAccel / (accelDuration / 2);
		const constantSpeedDuration = duration - accelDuration - baseDecel;
		const rotationDuringConstant =
			peakSpeedPerMs * Math.max(0, constantSpeedDuration);

		const startTime = Date.now();
		let decelExtension = 0;
		let lastPost = 0;

		// Tick interval ~16ms
		const step = 16;

		const interval = setInterval(() => {
			const now = Date.now();
			const elapsed = now - startTime;

			let currentRotation = startRotation;

			if (elapsed < accelDuration) {
				const t = elapsed / accelDuration;
				const easeProgress = t * t;
				currentRotation = startRotation + rotationDuringAccel * easeProgress;
			} else if (
				constantSpeedDuration > 0 &&
				elapsed < accelDuration + constantSpeedDuration
			) {
				const constantElapsed = elapsed - accelDuration;
				currentRotation =
					startRotation +
					rotationDuringAccel +
					peakSpeedPerMs * constantElapsed;
			} else {
				const decelElapsed =
					elapsed - accelDuration - Math.max(0, constantSpeedDuration);
				const dynamicDecelTotal = plannedDecel + decelExtension;
				const u = Math.min(Math.max(decelElapsed / dynamicDecelTotal, 0), 1);
				const easeProgress = 1 - Math.pow(1 - u, 3);
				const rotationBeforeDecel =
					rotationDuringAccel + rotationDuringConstant;
				currentRotation =
					startRotation +
					rotationBeforeDecel +
					rotationDuringDecel * easeProgress;

				const easeDerivWrtU = 3 * Math.pow(1 - u, 2);
				const angularSpeed =
					(rotationDuringDecel * easeDerivWrtU) / dynamicDecelTotal;

				const speedThreshold = 0.002;
				const maxExtension = 10000; // ms
				const extensionStep = 100; // ms
				if (
					decelElapsed >= plannedDecel &&
					angularSpeed > speedThreshold &&
					decelExtension < maxExtension
				) {
					decelExtension += extensionStep;
				}
			}

			// Post updates at ~60fps (every ~16ms)
			if (now - lastPost >= step) {
				lastPost = now;
				self.postMessage({
					type: "tick",
					id,
					rotation: currentRotation,
					timestamp: now,
				});
			}

			// Determine if finished
			const decelStart = accelDuration + Math.max(0, constantSpeedDuration);
			const decelElapsedCheck = Math.max(
				0,
				Date.now() - startTime - decelStart
			);
			const dynamicDecelTotalCheck = baseDecel + extraSlow + decelExtension;
			let stillRunning = false;
			if (decelElapsedCheck < dynamicDecelTotalCheck) {
				stillRunning = true;
			} else {
				const u = Math.min(
					Math.max(decelElapsedCheck / dynamicDecelTotalCheck, 0),
					1
				);
				const easeDerivWrtU = 3 * Math.pow(1 - u, 2);
				const angularSpeed =
					(rotationDuringDecel * easeDerivWrtU) / dynamicDecelTotalCheck;
				if (angularSpeed > 0.002 && decelExtension < 10000) {
					decelExtension += 100;
					stillRunning = true;
				}
			}

			if (!stillRunning) {
				clearInterval(interval);
				const finalRotation = currentRotation % 360;
				self.postMessage({ type: "done", id, finalRotation });
			}
		}, step);
	}
};
