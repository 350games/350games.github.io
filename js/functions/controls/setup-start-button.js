(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupStartButton = function setupStartButton() {
    elements.startButton.addEventListener("click", () => {
        elements.startPopup.style.display = "none";
        const { fanSound } = elements.audio;
        if (fanSound) {
            fanSound.volume = 0.4;
            fanSound.currentTime = 0;
            fanSound.play().catch(() => {});
        }

        elements.decryptWindow.style.display = "flex";
        elements.decryptBtn.style.display = "inline-block";
        elements.finishBtn.style.display = "none";
    }, { once: true });
}
})();
