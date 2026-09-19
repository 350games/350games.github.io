(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.playClick = function playClick() {
    const { buttonClick } = elements.audio;
    if (!buttonClick) return;

    buttonClick.volume = 0.5;
    buttonClick.currentTime = 0;
    buttonClick.play().catch(() => {});
}
})();
