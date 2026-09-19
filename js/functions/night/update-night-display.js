(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.updateNightDisplay = function updateNightDisplay() {
    if (!state.isNightActive) return;

    const elapsedSeconds = (Date.now() - state.nightStartTimestamp) / 1000;
    const progress = Math.min(elapsedSeconds / (gameConfig.gameplay.nightDurationMs / 1000), 1);

    // A power outage removes the HUD, but the clock still advances toward 6 AM.
    if (state.powerOut) {
        if (progress >= 1) endNight();
        return;
    }

    const totalMinutes = Math.floor(progress * 360);
    let hour = 12 + Math.floor(totalMinutes / 60);
    if (hour >= 13) hour -= 12;

    const minute = totalMinutes % 60;
    const timeText = `${hour}:${minute < 10 ? "0" : ""}${minute} AM`;
    elements.nightDisplay.textContent = `${timeText} - NIGHT ${state.currentNight}`;
    elements.nightDisplay.style.display = "block";

    if (progress >= 1) endNight();
}
})();
