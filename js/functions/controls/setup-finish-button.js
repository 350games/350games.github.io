(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupFinishButton = function setupFinishButton() {
    elements.finishBtn.addEventListener("click", () => {
        playClick();
        elements.decryptWindow.style.display = "none";

        if (state.currentNight === 6) startNightSixEnding();
        else if (state.currentNight === 5) startNightFiveSleepSequence();
        else startNight();
    });
}
})();
