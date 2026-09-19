(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.updateOfficeImage = function updateOfficeImage() {
    const { office } = elements.images;
    if (!office || state.powerOut || !state.gameStarted) return;

    let fileName = gameConfig.assets.office.dark;
    if (state.lightOn) {
        fileName = state.enemyPosition === "office"
            ? gameConfig.assets.office.enemyLit
            : gameConfig.assets.office.lit;
    }

    office.src = texturePath(fileName);
}
})();
