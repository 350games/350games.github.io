(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startNightFiveSleepSequence = function startNightFiveSleepSequence() {
    [
        elements.hud,
        document.getElementById("powerUsage"),
        document.getElementById("camHUD"),
        elements.taskBar,
        elements.controlTab,
        elements.camTab,
        elements.lightTab,
        elements.nightDisplay
    ].forEach((element) => {
        if (element) element.style.display = "none";
    });

    const { sleepScreen, sleepPrompt, endingBlackOverlay, redGradient } = elements;
    sleepScreen.style.display = "flex";
    sleepScreen.style.opacity = "1";
    sleepScreen.style.pointerEvents = "auto";
    sleepPrompt.style.opacity = "1";

    sleepScreen.onclick = () => {
        sleepScreen.onclick = null;
        sleepScreen.style.pointerEvents = "none";

        // Keep the black screen solid. Only the instruction fades away.
        sleepPrompt.style.opacity = "0";

        setTimeout(() => {
            // Put an already-opaque black layer behind the prompt screen before
            // removing it, so there is no black-screen fade or flash.
            endingBlackOverlay.style.display = "block";
            endingBlackOverlay.style.transition = "none";
            endingBlackOverlay.style.opacity = "1";
            sleepScreen.style.display = "none";
            sleepScreen.style.pointerEvents = "auto";
            sleepPrompt.style.opacity = "1";

            setTimeout(() => {
                redGradient.style.display = "block";
                redGradient.style.transition = "opacity 90s linear";
                redGradient.style.opacity = "1";

                const { alarmSound } = elements.audio;
                if (alarmSound) {
                    alarmSound.currentTime = 0;
                    alarmSound.volume = 0.6;
                    alarmSound.loop = true;
                    alarmSound.play().catch(() => {});
                }

                setTimeout(() => {
                    endingBlackOverlay.style.transition = "opacity 0.8s ease";
                    endingBlackOverlay.style.opacity = "0";
                    setTimeout(() => {
                        endingBlackOverlay.style.display = "none";
                        startNightSixEnding();
                    }, 800);
                }, 5000);
            }, 5000);
        }, 2000);
    };
}
})();
