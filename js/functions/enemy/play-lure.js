(() => {
    const FNAE = window.FNAE;
    const { gameConfig, elements, state } = FNAE;

FNAE.playLure = function playLure() {
    const { lureBtn } = elements;
    if (state.lureCooldown || !state.cameraOpen || state.powerOut || !state.gameStarted) return;

    playClick();
    const targetCamera = state.currentCam;
    if (targetCamera > 2) return;

    // Calling the enemy to CAM 2 pulls it out of the office immediately and
    // cancels the queued office jumpscare before the lure animation starts.
    const pullingEnemyOutOfOffice = state.enemyPosition === "office" && targetCamera === 2;
    if (pullingEnemyOutOfOffice && state.officeTimer) {
        clearTimeout(state.officeTimer);
        state.officeTimer = null;
    }

    triggerMovementGlitch();
    setTimeout(() => {
        if (!state.gameStarted || state.powerOut || state.isJumpscaring) return;

        let moved = false;
        if (state.enemyPosition === "cam1" && targetCamera === 2) {
            state.enemyPosition = "cam2";
            moved = true;
        } else if (state.enemyPosition === "cam2" && targetCamera === 1) {
            state.enemyPosition = "cam1";
            moved = true;
        } else if (pullingEnemyOutOfOffice) {
            state.enemyPosition = "cam2";
            moved = true;
        } else if (state.enemyPosition === `cam${targetCamera}`) {
            moved = true;
        }

        if (!moved) return;

        if (pullingEnemyOutOfOffice && state.lightOn) {
            state.lightOn = false;
        }

        if (state.cameraOpen) refreshCameraImage();
        updateOfficeImage();

        // An enemy lured out of the office resumes normal movement later.
        if (pullingEnemyOutOfOffice) {
            state.officeTimer = null;
            state.canMove = true;
            if (!state.moveTimeout) {
                const enemyConfig = gameConfig.gameplay.enemy;
                const delay = enemyConfig.moveMinDelayMs + Math.random() * enemyConfig.moveRandomDelayMs;
                state.moveTimeout = setTimeout(moveEnemy, delay);
            }
        }
    }, gameConfig.gameplay.enemy.lureMoveDelayMs);

    state.lureCooldown = true;
    lureBtn.style.pointerEvents = "none";
    lureBtn.style.opacity = 0.5;
    const dots = [".", "..", "..."];
    let dotIndex = 0;
    state.lureDotInterval = setInterval(() => {
        lureBtn.textContent = `PLAY AUDIO${dots[dotIndex]}`;
        dotIndex = (dotIndex + 1) % dots.length;
    }, 500);

    setTimeout(() => {
        clearInterval(state.lureDotInterval);
        lureBtn.textContent = "PLAY AUDIO";
        state.lureCooldown = false;
        lureBtn.style.pointerEvents = "auto";
        lureBtn.style.opacity = 1;
    }, gameConfig.gameplay.enemy.lureCooldownMs);
}
})();
