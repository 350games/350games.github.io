(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.stopEndingCameraGlitch = function stopEndingCameraGlitch() {
    if (state.endingGlitchInterval) clearInterval(state.endingGlitchInterval);
    state.endingGlitchInterval = null;
}
})();
