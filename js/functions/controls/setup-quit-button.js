(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupQuitButton = function setupQuitButton() {
    elements.quitGameBtn.addEventListener("click", () => {
        elements.quitGameBtn.textContent = "EXITING...";
        elements.quitGameBtn.disabled = true;
        setTimeout(() => {
            if (typeof nw !== "undefined" && nw.Window && nw.Window.get()) {
                nw.Window.get().close(true);
            } else {
                window.close();
            }
        }, 400);
    });
}
})();
