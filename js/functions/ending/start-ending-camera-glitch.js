(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startEndingCameraGlitch = function startEndingCameraGlitch() {
    const { cameraImage, errOverlay, staticEl } = elements.images;
    if (state.endingGlitchInterval) clearInterval(state.endingGlitchInterval);

    state.endingGlitchInterval = setInterval(() => {
        if (!state.cameraOpen) return;

        const randomValue = Math.random();
        if (randomValue < 0.35) {
            cameraImage.src = texturePath(gameConfig.assets.cameraViews.fallback);
            errOverlay.style.display = "block";
        } else if (randomValue < 0.65) {
            cameraImage.src = texturePath("err.png");
            errOverlay.style.display = "none";
        } else {
            state.currentCam = Math.random() < 0.5 ? 1 : 2;
            refreshCameraImage();
            errOverlay.style.display = "none";
        }

        if (staticEl) {
            staticEl.style.transition = "opacity 0.3s";
            staticEl.style.opacity = 0.6 + Math.random() * 0.4;
            setTimeout(() => {
                staticEl.style.opacity = 0.12;
            }, 400);
        }
    }, 350);
}
})();
