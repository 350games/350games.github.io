(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startPowerSystem = function startPowerSystem() {
    if (state.powerTimer) clearInterval(state.powerTimer);

    state.powerTimer = setInterval(() => {
        if (!state.gameStarted || state.powerOut) {
            if (state.infinitePower && elements.powerDisplay) {
                elements.powerDisplay.innerHTML = "Power: <span style=\"color:#ffff00\">âˆž</span>";
            }
            updatePowerBars();
            return;
        }

        if (!state.infinitePower) {
            const powerConfig = gameConfig.gameplay.power;
            const nightTarget = powerConfig.targetRemainingAtNightEndByNight?.[state.currentNight];
            const baselineDrain = Number.isFinite(nightTarget)
                ? (powerConfig.startingAmount - nightTarget) / (gameConfig.gameplay.nightDurationMs / 1000)
                : powerConfig.normalDrainPerSecond;
            const drain = state.cameraOpen || state.lightOn
                ? powerConfig.activeDeviceDrainPerSecond
                : baselineDrain;
            state.power = Math.max(0, state.power - drain);
            if (elements.powerDisplay) elements.powerDisplay.textContent = `Power: ${Math.floor(state.power)}%`;
        } else if (elements.powerDisplay) {
            elements.powerDisplay.innerHTML = "Power: <span style=\"color:#ffff00\">âˆž</span>";
        }

        updatePowerBars();
        if (state.power > 0 || state.powerOutPlayed || state.infinitePower) return;

        state.powerOutPlayed = true;
        state.powerOut = true;
        if (elements.audio.powerOutAudio) elements.audio.powerOutAudio.play().catch(() => {});
        state.lightOn = false;
        closeCameraWindow();
        stopAllLoopingAudio();
        hideHudForPowerOut();
    }, 1000);
}
})();
