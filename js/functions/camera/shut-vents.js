(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.shutVents = function shutVents() {
    const { shutVentsBtn, camHealthText } = elements;
    const { camClock, errOverlay, staticEl } = elements.images;
    const { alarmSound, monitorStatic } = elements.audio;
    if (state.restarting || !state.errorPersistent) return;

    if (state.controlPanelAlarmTimer) {
        clearTimeout(state.controlPanelAlarmTimer);
        state.controlPanelAlarmTimer = null;
    }
    stopControlPanelAlarm();
    state.restarting = true;
    playClick();
    if (shutVentsBtn) shutVentsBtn.textContent = "SHUTTING VENTS...";

    setTimeout(() => {
        state.errorPersistent = false;
        state.cameraHealth = gameConfig.gameplay.camera.healthStartingAmount;
        if (camHealthText) camHealthText.textContent = `CAM ${state.cameraHealth}%`;
        if (camClock) camClock.style.animation = "camTimer 15s linear infinite, clockPulse 15s linear infinite";
        startCameraHealthTimer();
        if (errOverlay) errOverlay.style.display = "none";
        state.camSwitchCount = 0;
        state.restarting = false;
        if (staticEl) staticEl.style.opacity = state.powerOut ? 0.5 : 0.12;
        if (monitorStatic) monitorStatic.volume = state.powerOut ? 0.1 : 0.35;
        if (shutVentsBtn) shutVentsBtn.textContent = ">>> SHUT VENTS";
        if (state.cameraOpen) startCameraFlicker();
    }, gameConfig.gameplay.camera.ventShutdownDurationMs);
}
})();
