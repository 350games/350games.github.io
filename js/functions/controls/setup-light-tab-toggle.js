(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupLightTabToggle = function setupLightTabToggle() {
    elements.lightTab.addEventListener("click", () => {
        playClick();
        if (state.powerOut || state.power <= 0 || state.cameraOpen) return;

        state.lightOn = !state.lightOn;
        updateOfficeImage();
    });
}
})();
