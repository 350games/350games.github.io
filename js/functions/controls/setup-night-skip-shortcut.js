(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupNightSkipShortcut = function setupNightSkipShortcut() {
    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (key === "s") state.skipKeys.sPressed = true;
        if (key === "n") state.skipKeys.nPressed = true;

        if (state.skipKeys.sPressed && state.skipKeys.nPressed && !state.skipKeys.holdStartedAt
            && state.isNightActive && state.gameStarted) {
            state.skipKeys.holdStartedAt = Date.now();
        }
    });

    document.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();
        if (key === "s") state.skipKeys.sPressed = false;
        if (key === "n") state.skipKeys.nPressed = false;
        if (!state.skipKeys.sPressed || !state.skipKeys.nPressed) state.skipKeys.holdStartedAt = null;
    });

    setInterval(() => {
        const heldLongEnough = state.skipKeys.holdStartedAt
            && Date.now() - state.skipKeys.holdStartedAt >= 5000;
        if (!heldLongEnough || !state.skipKeys.sPressed || !state.skipKeys.nPressed
            || !state.isNightActive || !state.gameStarted) return;

        state.skipKeys.holdStartedAt = null;
        elements.nightSkipPopup.style.display = "flex";
    }, 100);

    elements.skipConfirmBtn.addEventListener("click", () => {
        const targetNight = Number.parseInt(elements.skipNightInput.value, 10);
        if (targetNight >= 1 && targetNight <= 5) {
            state.currentNight = targetNight - 1;
            elements.nightSkipPopup.style.display = "none";
            endNight();
        }
    });

    elements.skipCancelBtn.addEventListener("click", () => {
        elements.nightSkipPopup.style.display = "none";
    });
}
})();
