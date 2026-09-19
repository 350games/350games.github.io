(() => {
    const FNAE = window.FNAE;
    const { state } = FNAE;

FNAE.stopCameraFlicker = function stopCameraFlicker() {
    state.flickerToken += 1;
    if (state.flickerFrame) cancelAnimationFrame(state.flickerFrame);
    state.flickerFrame = null;
    if (state.flickerInterval) clearInterval(state.flickerInterval);
    state.flickerInterval = null;
}
})();
