(() => {
    const FNAE = window.FNAE;
    const { gameConfig, elements, state } = FNAE;

FNAE.moveEnemy = function moveEnemy() {
    const enemyConfig = gameConfig.gameplay.enemy;
    const { staticEl } = elements.images;
    state.moveTimeout = null;
    if (!state.canMove || state.powerOut || !state.gameStarted || state.isJumpscaring) return;

    state.canMove = false;
    triggerMovementGlitch();

    setTimeout(() => {
        if (!state.gameStarted || state.powerOut || state.isJumpscaring) return;
        const previousPosition = state.enemyPosition;
        if (state.enemyPosition === "cam1") state.enemyPosition = "cam2";
        else if (state.enemyPosition === "cam2") state.enemyPosition = "office";

        if ((previousPosition === "office" || state.enemyPosition === "office") && state.lightOn) {
            state.lightOn = false;
        }

        if (state.cameraOpen) refreshCameraImage();
        updateOfficeImage();

        if ((state.currentCam === 1 && state.enemyPosition === "cam1")
            || (state.currentCam === 2 && state.enemyPosition === "cam2")) {
            staticEl.style.transition = "opacity 0.2s";
            staticEl.style.opacity = 0.85;
        }

        if (state.enemyPosition === "office" && !state.officeTimer) {
            state.officeTimer = setTimeout(() => {
                state.officeTimer = null;
                if (state.enemyPosition === "office" && !state.isJumpscaring) triggerJumpscare();
            }, enemyConfig.officeJumpscareDelayMs);
        }
    }, enemyConfig.movementTransitionMs);

    setTimeout(() => {
        state.canMove = true;
        if (state.enemyPosition !== "office" && !state.moveTimeout && !state.isJumpscaring) {
            const delay = enemyConfig.moveMinDelayMs + Math.random() * enemyConfig.moveRandomDelayMs;
            state.moveTimeout = setTimeout(moveEnemy, delay);
        }
    }, enemyConfig.movementCooldownMs);
}
})();
