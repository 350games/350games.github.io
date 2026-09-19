(() => {
    const FNAE = window.FNAE = window.FNAE || {};

    if (!FNAE.gameConfig) {
        throw new Error("Game configuration did not load.");
    }

    FNAE.texturePath = (fileName) => `${FNAE.gameConfig.paths.textures}/${fileName}`;
    FNAE.soundPath = (fileName) => `${FNAE.gameConfig.paths.sounds}/${fileName}`;
})();
