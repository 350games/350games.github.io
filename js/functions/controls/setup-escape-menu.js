(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupEscapeMenu = function setupEscapeMenu() {
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();

        if (state.escapeMenuOpen) {
            elements.escapeMenu.style.display = "none";
            state.escapeMenuOpen = false;
        } else if (state.gameStarted && !state.powerOut) {
            elements.escapeMenu.style.display = "block";
            state.escapeMenuOpen = true;
        }
    });
}
})();
