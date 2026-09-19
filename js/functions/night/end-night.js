(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.endNight = function endNight() {
    const { fanSound, overSound } = elements.audio;
    state.isNightActive = false;
    if (state.nightTimerInterval) clearInterval(state.nightTimerInterval);
    if (state.moveTimeout) {
        clearTimeout(state.moveTimeout);
        state.moveTimeout = null;
    }
    if (state.officeTimer) {
        clearTimeout(state.officeTimer);
        state.officeTimer = null;
    }
    state.canMove = false;
    state.lightOn = false;
    if (state.cameraOpen) closeCameraWindow();
    if (elements.controlPanel.style.display === "block") elements.controlPanel.style.display = "none";
    stopAllLoopingAudio();
    stopCameraPan();
    if (state.currentPhoneCall) {
        state.currentPhoneCall.pause();
        state.currentPhoneCall = null;
    }
    if (elements.muteBtn) elements.muteBtn.style.display = "none";

    if (overSound) {
        overSound.currentTime = 0;
        overSound.volume = 0.9;
        overSound.play().catch(() => {});
    }

    const endOverlay = document.createElement("div");
    endOverlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:black;opacity:0;z-index:250;transition:opacity 1.8s ease;";
    document.body.appendChild(endOverlay);

    const endText = document.createElement("div");
    endText.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#ff0000;font-size:90px;font-weight:bold;text-shadow:0 0 30px #ff0000;z-index:260;opacity:0;transition:opacity 1.2s ease;";
    endText.textContent = "6:00 AM";
    document.body.appendChild(endText);

    setTimeout(() => {
        endOverlay.style.opacity = "1";
    }, 30);
    setTimeout(() => {
        endText.style.opacity = "1";
    }, 1700);
    setTimeout(() => {
        endText.style.opacity = "0";
        setTimeout(() => {
            endOverlay.style.opacity = "0";
            setTimeout(() => {
                if (fanSound) {
                    fanSound.volume = 0;
                    fanSound.play().catch(() => {});
                    rampVolume(fanSound, 0.4, 1800);
                }
                elements.nightDisplay.textContent = `11:00 PM - NIGHT ${state.currentNight + 1}`;
                elements.nightDisplay.style.display = "block";
                endText.remove();
                endOverlay.remove();
                state.currentNight += 1;

                if (state.currentNight > 6) {
                    alert("YOU SURVIVED ALL 5 NIGHTS!");
                    window.location.reload();
                    return;
                }

                state.gameStarted = false;
                state.canMove = false;
                elements.decryptWindow.style.display = "flex";
                elements.decryptBtn.style.display = "inline-block";
                elements.finishBtn.style.display = "none";
            }, 900);
        }, 1300);
    }, 3400);
}
})();
