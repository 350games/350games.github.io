(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.animateOfficePan = function animateOfficePan() {
    const { office } = elements.images;
    const { controlTab, camTab, lightTab } = elements;
    if (!office || !controlTab || !camTab || !lightTab) return;

    let currentLeft = Number.parseFloat(office.style.left) || -20;
    if (Math.abs(currentLeft - state.officePanTargetLeft) > 0.5) {
        currentLeft += (state.officePanTargetLeft - currentLeft) * 0.45;
    }
    currentLeft = Math.max(-40, Math.min(0, currentLeft));

    office.style.left = `${currentLeft}%`;
    controlTab.style.opacity = currentLeft >= -5 ? 1 : 0;
    controlTab.style.pointerEvents = currentLeft >= -5 ? "auto" : "none";

    const showCameraControls = currentLeft <= -25;
    camTab.style.opacity = showCameraControls ? 1 : 0;
    lightTab.style.opacity = showCameraControls ? 1 : 0;
    camTab.style.pointerEvents = showCameraControls ? "auto" : "none";
    lightTab.style.pointerEvents = showCameraControls ? "auto" : "none";
    requestAnimationFrame(animateOfficePan);
}
})();
