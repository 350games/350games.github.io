(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupDecryptButton = function setupDecryptButton() {
    elements.decryptBtn.addEventListener("click", () => {
        playClick();
        elements.decryptBtn.style.display = "none";
        elements.finishBtn.style.display = "inline-block";
    });
}
})();
