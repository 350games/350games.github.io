(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.activatePowerCheat = function activatePowerCheat() {
    const { activateSound } = elements.audio;
    state.infinitePower = true;
    if (activateSound) {
        activateSound.currentTime = 0;
        activateSound.play().catch(() => {});
    }
    if (elements.powerDisplay) {
        elements.powerDisplay.innerHTML = "Power: <span style=\"color:#ffff00\">&infin;</span>";
    }
}
})();
