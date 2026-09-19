(() => {
    const FNAE = window.FNAE;
    const { gameConfig, elements, state } = FNAE;

FNAE.cancelCameraFadeQueue = function cancelCameraFadeQueue() {
    state.cameraFadeTimers.forEach((timer) => clearTimeout(timer));
    state.cameraFadeTimers = [];
    state.cameraTransitionActive = false;
    state.movementStaticToken += 1;
    state.movementStaticActive = false;
    elements.images.staticEl?.classList.remove("camera-transition-active");
};

FNAE.queueCameraFade = function queueCameraFade(callback, delayMs) {
    const timer = setTimeout(() => {
        state.cameraFadeTimers = state.cameraFadeTimers.filter((queuedTimer) => queuedTimer !== timer);
        callback();
    }, delayMs);
    state.cameraFadeTimers.push(timer);
    return timer;
};

FNAE.switchCamera = function switchCamera(cameraNumber) {
    const { cameraImage, staticEl, camClock } = elements.images;
    const { monitorStatic } = elements.audio;
    const cameraConfig = gameConfig.gameplay.camera;
    if (state.cameraTransitionActive || state.errorPersistent || state.restarting || !cameraImage) return;

    playClick();
    state.camSwitchCount += 1;
    const isRiskySwitch = state.camSwitchCount >= cameraConfig.switchErrorStart
        && state.camSwitchCount <= cameraConfig.switchErrorEnd;
    if (isRiskySwitch && Math.random() < cameraConfig.switchErrorChance) {
        if (camClock) {
            camClock.style.animation = "none";
            camClock.style.transform = "rotate(0deg)";
        }
        if (state.cameraHealthTimer) clearInterval(state.cameraHealthTimer);
        triggerCameraError();
        return;
    }

    // The first fade owns the transition. Repeated inputs are ignored, not queued.
    state.cameraTransitionActive = true;
    state.currentCam = cameraNumber;
    FNAE.updateCameraMap?.(cameraNumber);
    stopCameraFlicker();
    if (staticEl) {
        staticEl.classList.add("camera-transition-active");
        staticEl.style.opacity = 0.88;
    }
    if (monitorStatic) {
        monitorStatic.volume = 1;
        if (monitorStatic.paused) monitorStatic.play().catch(() => {});
    }

    cameraImage.style.transition = "opacity 0.18s ease-out";
    cameraImage.style.opacity = 0;
    FNAE.queueCameraFade(() => {
        if (!state.cameraOpen) return;
        refreshCameraImage();
        cameraImage.style.transition = "opacity 0.25s ease-in";
        cameraImage.style.opacity = 1;
    }, 190);

    FNAE.queueCameraFade(() => {
        if (!state.cameraOpen || !staticEl || !monitorStatic) return;
        staticEl.style.opacity = state.powerOut ? 0.5 : (state.errorPersistent ? 1 : 0.12);
        rampVolume(monitorStatic, state.powerOut ? 0.1 : (state.errorPersistent ? 1 : 0.35), 420);
    }, 520);

    FNAE.queueCameraFade(() => {
        if (state.cameraOpen) updateCameraPanState();
    }, 600);

    FNAE.queueCameraFade(() => {
        state.cameraTransitionActive = false;
        staticEl?.classList.remove("camera-transition-active");
        if (state.cameraOpen && !state.errorPersistent && !state.powerOut) startCameraFlicker();
    }, 1020);
}
})();
