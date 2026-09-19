(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupPowerCheatShortcut = function setupPowerCheatShortcut() {
    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "p" && !state.powerCheatHoldStartedAt) {
            state.powerCheatHoldStartedAt = Date.now();
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key.toLowerCase() !== "p" || !state.powerCheatHoldStartedAt) return;

        if (Date.now() - state.powerCheatHoldStartedAt >= 5000) activatePowerCheat();
        state.powerCheatHoldStartedAt = null;
    });
}
})();
