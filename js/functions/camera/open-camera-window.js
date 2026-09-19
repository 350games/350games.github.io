(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.openCameraWindow = function openCameraWindow() {
    const { cameraWindow, taskBar, camBarTop, camBarBottom } = elements;
    const { staticEl } = elements.images;
    const { monitorStatic } = elements.audio;
    if (!cameraWindow || !taskBar || state.powerOut) return;

    state.cameraOpen = true;
    cameraWindow.style.display = "block";
    setTimeout(() => {
        cameraWindow.style.opacity = 1;
        taskBar.style.opacity = 1;
        camBarTop.style.opacity = 1;
        camBarBottom.style.opacity = 1;
    }, 10);

    if (staticEl) staticEl.style.opacity = state.errorPersistent ? 1 : (state.powerOut ? 0.5 : 0.12);
    if (monitorStatic) {
        monitorStatic.volume = state.errorPersistent ? 1 : (state.powerOut ? 0.1 : 0.35);
        if (monitorStatic.paused) monitorStatic.play().catch(() => {});
    }

    startCameraFlicker();
    refreshCameraImage();
    setTimeout(refreshCameraImage, 50);
    setTimeout(updateCameraPanState, 300);
}
})();
