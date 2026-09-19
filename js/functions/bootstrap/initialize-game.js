(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.initializeGame = async function initializeGame() {
    assignAssetSources();
    await preloadAssets();

    startPowerSystem();
    setupStartButton();
    setupCameraButtons();
    setupLureButton();
    setupRestartControls();
    setupControlPanelToggle();
    setupCameraTabToggle();
    setupLightTabToggle();
    setupEscapeMenu();
    setupQuitButton();
    setupFinalScreenButton();
    setupDecryptButton();
    setupFinishButton();
    setupMuteButton();
    setupDecryptTabToggle();
    setupDecryptWindowDragging();
    setupNightSkipShortcut();
    setupPowerCheatShortcut();
    setupOfficePan();
}
})();
