(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startNightSixEnding = function startNightSixEnding() {
    const { alarmSound, alarendgSound, phonecall6Sound } = elements.audio;

    state.gameStarted = false;
    state.isNightActive = false;
    if (state.nightTimerInterval) clearInterval(state.nightTimerInterval);
    if (state.moveTimeout) {
        clearTimeout(state.moveTimeout);
        state.moveTimeout = null;
    }
    state.canMove = false;

    elements.camTab.style.opacity = "1";
    elements.camTab.style.pointerEvents = "auto";
    [
        elements.nightDisplay,
        elements.hud,
        document.getElementById("powerUsage"),
        document.getElementById("camHUD"),
        elements.taskBar,
        elements.controlTab,
        elements.lightTab,
        elements.muteBtn
    ].forEach((element) => {
        if (element) element.style.display = "none";
    });

    if (alarendgSound) {
        alarendgSound.currentTime = 0;
        alarendgSound.volume = 0.5;
        alarendgSound.loop = true;
        alarendgSound.play().catch(() => {});
    }
    if (alarmSound) {
        alarmSound.currentTime = 0;
        alarmSound.volume = 0.45;
        alarmSound.loop = true;
        alarmSound.play().catch(() => {});
    }
    if (phonecall6Sound) {
        phonecall6Sound.currentTime = 0;
        phonecall6Sound.volume = 0.85;
        phonecall6Sound.loop = false;
        phonecall6Sound.play().catch(() => {});
        state.currentPhoneCall = phonecall6Sound;
    }

    startEndingCameraGlitch();
    setTimeout(endNightSixSequence, gameConfig.gameplay.ending.nightSixDurationMs);
}
})();
