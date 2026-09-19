(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, elements, state } = FNAE;

FNAE.triggerJumpscare = function triggerJumpscare() {
    if (state.isJumpscaring) return;

    const { office } = elements.images;
    const { jumpscareSound, static3Sound, cameraPanSound } = elements.audio;
    const gameUi = [
        elements.cameraWindow,
        elements.taskBar,
        elements.hud,
        document.getElementById("powerUsage"),
        document.getElementById("camHUD"),
        elements.controlTab,
        elements.camTab,
        elements.lightTab,
        elements.controlPanel,
        elements.startPopup,
        elements.escapeMenu,
        elements.decryptWindow,
        elements.muteBtn,
        elements.nightDisplay,
        elements.nightSkipPopup,
        elements.redGradient,
        elements.endingBlackOverlay,
        elements.sleepScreen,
        elements.wakeScreen,
        elements.finalScreen
    ];

    state.isJumpscaring = true;
    state.deathCanContinue = false;
    state.isNightActive = false;
    state.gameStarted = false;
    state.lightOn = false;
    if (office) {
        office.src = texturePath(gameConfig.assets.office.dark);
        office.style.display = "block";
    }
    if (state.nightTimerInterval) {
        clearInterval(state.nightTimerInterval);
        state.nightTimerInterval = null;
    }
    if (state.moveTimeout) {
        clearTimeout(state.moveTimeout);
        state.moveTimeout = null;
    }
    if (state.officeTimer) {
        clearTimeout(state.officeTimer);
        state.officeTimer = null;
    }
    FNAE.cancelCameraFadeQueue?.();
    if (state.currentPhoneCall) {
        state.currentPhoneCall.pause();
        state.currentPhoneCall.currentTime = 0;
        state.currentPhoneCall = null;
    }

    gameUi.forEach((element) => {
        if (element) element.style.display = "none";
    });

    if (state.cameraOpen) closeCameraWindow();
    stopAllLoopingAudio();
    stopCameraFlicker();
    if (state.cameraHealthTimer) clearInterval(state.cameraHealthTimer);
    if (cameraPanSound) cameraPanSound.pause();
    stopCameraPan();

    elements.jumpscareContainer.style.display = "block";
    setTimeout(() => {
        elements.jumpscareContainer.style.transform = "translate(-50%, -50%) scale(4)";
    }, 50);

    if (jumpscareSound) {
        jumpscareSound.currentTime = 0;
        jumpscareSound.volume = 0.95;
        jumpscareSound.play().catch(() => {});
    }

    setTimeout(() => {
        elements.jumpscareContainer.style.display = "none";
        // Once the jumpscare ends, static sits over a black screen instead of
        // leaving the office visible behind it.
        if (office) office.style.display = "none";
        elements.deathStatic.style.display = "block";
        elements.deathStatic.style.transition = "none";
        elements.deathStatic.style.opacity = "1";
        elements.deathStatic.style.pointerEvents = "none";
        elements.deathStatic.onclick = null;
        elements.gameOverText.style.display = "none";
        elements.gameOverText.style.opacity = "0";
        elements.deathContinue.style.display = "none";
        elements.deathContinue.style.opacity = "0";

        if (static3Sound) {
            static3Sound.currentTime = 0;
            static3Sound.volume = 0.9;
            static3Sound.play().catch(() => {});
        }

        // The title and continue prompt enter separately: 5 seconds, then 10 seconds.
        setTimeout(() => {
            elements.gameOverText.style.display = "block";
            requestAnimationFrame(() => {
                elements.gameOverText.style.opacity = "1";
            });
        }, 5000);

        setTimeout(() => {
            elements.deathContinue.style.display = "block";
            requestAnimationFrame(() => {
                elements.deathContinue.style.opacity = "1";
            });

            state.deathCanContinue = true;
            elements.deathStatic.style.pointerEvents = "auto";
            elements.deathStatic.onclick = () => {
                if (!state.deathCanContinue) return;
                state.deathCanContinue = false;
                elements.deathStatic.style.pointerEvents = "none";
                elements.deathStatic.onclick = null;

                FNAE.rampVolume(static3Sound, 0, 1500);
                elements.deathStatic.style.transition = "opacity 1.5s ease-out";
                elements.deathStatic.style.opacity = "0";
                elements.gameOverText.style.opacity = "0";
                elements.deathContinue.style.opacity = "0";

                setTimeout(() => {
                    if (static3Sound) {
                        static3Sound.pause();
                        static3Sound.currentTime = 0;
                    }
                    window.location.href = gameConfig.app.mainMenuUrl;
                }, 1550);
            };
        }, 10000);
    }, 2000);
}
})();
