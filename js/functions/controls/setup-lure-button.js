(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupLureButton = function setupLureButton() {
    elements.lureBtn.addEventListener("click", playLure);
}
})();
