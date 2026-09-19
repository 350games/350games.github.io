(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupFinalScreenButton = function setupFinalScreenButton() {
    elements.finalScreen.addEventListener("click", () => {
        window.location.href = gameConfig.app.mainMenuUrl;
    });
}
})();
