(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupMuteButton = function setupMuteButton() {
    elements.muteBtn.addEventListener("click", () => {
        playClick();
        if (state.currentPhoneCall) {
            state.currentPhoneCall.pause();
            state.currentPhoneCall.currentTime = 0;
        }
        elements.muteBtn.style.display = "none";
    });
}
})();
