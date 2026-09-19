(() => {
    const FNAE = window.FNAE;
    const { elements, state } = FNAE;

FNAE.startCameraFlicker = function startCameraFlicker() {
    const { staticEl } = elements.images;
    const { monitorStatic } = elements.audio;
    if (state.cameraTransitionActive || !staticEl || !monitorStatic) return;

    stopCameraFlicker();
    const token = state.flickerToken;
    let inBurst = false;
    let nextChangeAt = performance.now() + 420 + Math.random() * 380;

    const animateStatic = (now) => {
        if (token !== state.flickerToken || !state.cameraOpen || state.errorPersistent || state.cameraTransitionActive) return;

        if (now >= nextChangeAt) {
            inBurst = !inBurst;
            const opacity = inBurst ? 0.42 + Math.random() * 0.2 : (state.powerOut ? 0.5 : 0.12);
            const volume = inBurst ? 0.38 + Math.random() * 0.16 : (state.powerOut ? 0.1 : 0.35);
            const duration = inBurst ? 150 + Math.random() * 220 : 520 + Math.random() * 420;

            staticEl.style.transition = `opacity ${inBurst ? "0.16s" : "0.42s"} cubic-bezier(0.22, 1, 0.36, 1)`;
            staticEl.style.opacity = opacity;
            rampVolume(monitorStatic, volume, inBurst ? 100 : 180);
            nextChangeAt = now + duration;
        }

        state.flickerFrame = requestAnimationFrame(animateStatic);
    };

    state.flickerFrame = requestAnimationFrame(animateStatic);
}
})();
