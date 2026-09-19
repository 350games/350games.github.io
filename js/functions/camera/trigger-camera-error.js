(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.triggerCameraError = function triggerCameraError() {
    const { errOverlay, staticEl } = elements.images;
    const { monitorStatic } = elements.audio;
    const { restartBtn } = elements;

    state.errorPersistent = true;
    if (errOverlay) errOverlay.style.display = "block";
    if (restartBtn) {
        restartBtn.style.color = "#ff0000";
        restartBtn.innerHTML = "RESTART CAMERA SYSTEM <span id=\"errorText\">ERROR</span>";
    }
    // Movement static owns the monitor until its sequence ends. The error
    // remains armed and becomes visible as soon as that higher-priority event ends.
    if (state.movementStaticActive) return;

    FNAE.cancelCameraFadeQueue?.();
    if (staticEl) staticEl.style.opacity = 1;
    if (monitorStatic) monitorStatic.volume = 1;

    stopCameraFlicker();
    stopCameraPan();
}
})();
