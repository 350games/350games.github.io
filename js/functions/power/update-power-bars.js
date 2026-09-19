(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.updatePowerBars = function updatePowerBars() {
    const [bar1, bar2, bar3, bar4] = elements.powerBars;
    if (!bar1 || !bar2 || !bar3 || !bar4) return;

    let usage = 1;
    if (state.cameraOpen) usage += 2;
    if (state.lightOn) usage += 1;

    [bar1, bar2, bar3, bar4].forEach((bar, index) => {
        bar.style.height = usage >= index + 1 ? "22px" : "8px";
    });
}
})();
