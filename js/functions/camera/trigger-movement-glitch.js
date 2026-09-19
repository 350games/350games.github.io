(() => {
    const FNAE = window.FNAE;
    const { elements, state } = FNAE;

FNAE.triggerMovementGlitch = function triggerMovementGlitch() {
    const { cameraImage, staticEl } = elements.images;
    const { monitorStatic } = elements.audio;
    if (!state.cameraOpen || !staticEl || !monitorStatic) return;

    // Enemy movement overrides every lower-priority camera/static transition.
    FNAE.cancelCameraFadeQueue?.();
    const movementToken = ++state.movementStaticToken;
    state.movementStaticActive = true;
    state.cameraTransitionActive = true;
    stopCameraFlicker();
    if (cameraImage) {
        refreshCameraImage();
        cameraImage.style.transition = "none";
        cameraImage.style.opacity = 1;
    }
    staticEl.classList.add("camera-transition-active");
    staticEl.style.opacity = 0.88;
    rampVolume(monitorStatic, 1, 400);
    if (monitorStatic.paused) monitorStatic.play().catch(() => {});

    FNAE.queueCameraFade(() => {
        if (movementToken !== state.movementStaticToken || !state.cameraOpen) return;
        staticEl.style.opacity = state.powerOut ? 0.5 : (state.errorPersistent ? 1 : 0.12);
        rampVolume(monitorStatic, state.powerOut ? 0.1 : (state.errorPersistent ? 1 : 0.35), 600);
    }, 3000);

    FNAE.queueCameraFade(() => {
        if (movementToken !== state.movementStaticToken) return;
        state.movementStaticActive = false;
        state.cameraTransitionActive = false;
        staticEl.classList.remove("camera-transition-active");
        if (state.cameraOpen && !state.errorPersistent && !state.powerOut) startCameraFlicker();
    }, 3700);
}
})();
