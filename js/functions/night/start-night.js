(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startNight = function startNight() {
    const { fanSound } = elements.audio;
    const { office } = elements.images;
    const { startingAmount } = gameConfig.gameplay.power;

    state.isNightActive = true;
    state.nightStartTimestamp = Date.now();
    state.gameStarted = true;
    state.canMove = true;
    state.isJumpscaring = false;
    if (state.officeTimer) {
        clearTimeout(state.officeTimer);
        state.officeTimer = null;
    }
    updateNightDisplay();
    playNightPhoneCall();

    elements.muteBtn.style.display = "block";
    state.enemyPosition = "cam1";
    state.currentCam = 1;
    state.power = startingAmount;
    state.powerOut = false;
    state.powerOutPlayed = false;
    state.cameraHealth = gameConfig.gameplay.camera.healthStartingAmount;
    [
        elements.taskBar,
        elements.camBarTop,
        elements.camBarBottom,
        elements.hud,
        document.getElementById("powerUsage"),
        document.getElementById("camHUD"),
        elements.controlTab,
        elements.camTab,
        elements.lightTab
    ].forEach((element) => {
        if (element) element.style.display = "";
    });
    elements.powerDisplay.textContent = `Power: ${startingAmount}%`;
    elements.powerDisplay.style.color = "#00ff00";
    elements.camHealthText.textContent = `CAM ${state.cameraHealth}%`;
    if (office) office.style.display = "block";
    updateOfficeImage();

    const midnightFlash = document.createElement("div");
    midnightFlash.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#ff0000;font-size:80px;font-weight:bold;text-shadow:0 0 30px #ff0000;z-index:100;pointer-events:none;";
    midnightFlash.textContent = "12:00 AM";
    document.body.appendChild(midnightFlash);
    setTimeout(() => {
        midnightFlash.style.transition = "opacity 1.5s";
        midnightFlash.style.opacity = "0";
    }, 800);
    setTimeout(() => midnightFlash.remove(), 3000);

    setTimeout(() => {
        if (state.moveTimeout) clearTimeout(state.moveTimeout);
        const enemyConfig = gameConfig.gameplay.enemy;
        const delay = enemyConfig.initialMoveMinDelayMs + Math.random() * enemyConfig.initialMoveRandomDelayMs;
        state.moveTimeout = setTimeout(moveEnemy, delay);
    }, 3500);

    startCameraHealthTimer();
    if (state.nightTimerInterval) clearInterval(state.nightTimerInterval);
    state.nightTimerInterval = setInterval(updateNightDisplay, 500);

    if (fanSound) fanSound.play().catch(() => {});
}
})();
