(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupOfficePan = function setupOfficePan() {
    document.addEventListener("mousemove", (event) => {
        const { office } = elements.images;
        if (!office || !elements.controlPanel || state.cameraOpen || elements.controlPanel.style.display === "block") return;

        if (event.clientX < 30) state.officePanTargetLeft = 0;
        else if (event.clientX > window.innerWidth - 30) state.officePanTargetLeft = -40;
    });

    animateOfficePan();
}
})();
