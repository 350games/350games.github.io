(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupDecryptTabToggle = function setupDecryptTabToggle() {
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        if (!state.isNightActive) {
            elements.decryptWindow.style.display = elements.decryptWindow.style.display === "flex"
                ? "none"
                : "flex";
        }
    });
}
})();
