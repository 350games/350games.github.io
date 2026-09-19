(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.endNightSixSequence = function endNightSixSequence() {
    const { alarendgSound, alarmSound, static4Sound } = elements.audio;

    stopEndingCameraGlitch();
    if (alarmSound) alarmSound.pause();
    if (state.currentPhoneCall) state.currentPhoneCall.pause();

    elements.redGradient.style.transition = "height 10s linear";
    elements.redGradient.style.height = "100%";
    if (static4Sound) {
        static4Sound.currentTime = 0;
        static4Sound.volume = 0.8;
        static4Sound.play().catch(() => {});
    }

    setTimeout(() => {
        if (alarendgSound) {
            alarendgSound.pause();
            alarendgSound.currentTime = 0;
            alarendgSound.loop = false;
        }
        elements.finalScreen.style.display = "flex";
    }, 3000);
}
})();
