(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startCameraHealthTimer = function startCameraHealthTimer() {
    const cameraConfig = gameConfig.gameplay.camera;
    const { camClock } = elements.images;
    const { damageSound } = elements.audio;

    if (state.cameraHealthTimer) clearInterval(state.cameraHealthTimer);
    state.cameraHealthTimer = setInterval(() => {
        if (!state.gameStarted || state.powerOut || state.errorPersistent || state.restarting) return;
        if (Math.random() >= cameraConfig.healthDamageChance) return;

        state.cameraHealth -= cameraConfig.healthDamage;
        if (damageSound) {
            damageSound.currentTime = 0;
            damageSound.volume = 0.8;
            damageSound.play().catch(() => {});
        }
        if (elements.camHealthText) elements.camHealthText.textContent = `CAM ${state.cameraHealth}%`;

        if (state.cameraHealth <= 0) {
            state.cameraHealth = 0;
            if (camClock) {
                camClock.style.animation = "none";
                camClock.style.transform = "rotate(0deg)";
            }
            triggerCameraError();
        }
    }, cameraConfig.healthCheckIntervalMs);
}
})();
