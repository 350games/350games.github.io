(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupRestartControls = function setupRestartControls() {
    elements.restartBtn.addEventListener("click", restartCameras);
    elements.shutVentsBtn.addEventListener("click", shutVents);
}
})();
