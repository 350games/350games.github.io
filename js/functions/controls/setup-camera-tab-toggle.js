(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupCameraTabToggle = function setupCameraTabToggle() {
    elements.camTab.addEventListener("click", () => {
        if (state.powerOut) return;

        playClick();
        if (state.cameraOpen) closeCameraWindow();
        else openCameraWindow();
    });
}
})();
