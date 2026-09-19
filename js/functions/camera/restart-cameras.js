(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.restartCameras = function restartCameras() {
    const { restartBtn, camHealthText } = elements;
    const { camClock, errOverlay, staticEl } = elements.images;
    const { alarmSound, beepSound, monitorStatic } = elements.audio;
    if (state.restarting || !state.errorPersistent) return;

    if (state.controlPanelAlarmTimer) {
        clearTimeout(state.controlPanelAlarmTimer);
        state.controlPanelAlarmTimer = null;
    }
    state.restarting = true;
    stopControlPanelAlarm();
    if (beepSound) {
        beepSound.loop = true;
        beepSound.currentTime = 0;
        beepSound.volume = 0.75;
        beepSound.play().catch(() => {});
    }

    const dots = [".", "..", "..."];
    let dotIndex = 0;
    const progressInterval = setInterval(() => {
        if (restartBtn) {
            restartBtn.innerHTML = `RESTART CAMERA SYSTEM ${dots[dotIndex]}<span id="errorText"></span>`;
        }
        dotIndex = (dotIndex + 1) % dots.length;
    }, 1000);

    setTimeout(() => {
        clearInterval(progressInterval);
        if (beepSound) {
            beepSound.pause();
            beepSound.loop = false;
            beepSound.currentTime = 0;
        }

        state.errorPersistent = false;
        state.cameraHealth = gameConfig.gameplay.camera.healthStartingAmount;
        if (camHealthText) camHealthText.textContent = `CAM ${state.cameraHealth}%`;
        if (camClock) camClock.style.animation = "camTimer 15s linear infinite, clockPulse 15s linear infinite";
        startCameraHealthTimer();
        if (errOverlay) errOverlay.style.display = "none";
        state.camSwitchCount = 0;
        state.restarting = false;
        if (restartBtn) {
            restartBtn.style.color = "#00ff00";
            restartBtn.innerHTML = "RESTART CAMERA SYSTEM <span id=\"errorText\"></span>";
        }
        if (staticEl) staticEl.style.opacity = state.powerOut ? 0.5 : 0.12;
        if (monitorStatic) monitorStatic.volume = state.powerOut ? 0.1 : 0.35;
        if (state.cameraOpen) startCameraFlicker();
    }, gameConfig.gameplay.camera.restartDurationMs);
}
})();
