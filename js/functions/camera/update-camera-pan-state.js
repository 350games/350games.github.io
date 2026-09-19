(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.updateCameraPanState = function updateCameraPanState() {
    if (!state.cameraOpen) {
        stopCameraPan();
        return;
    }

    if (state.currentCam <= 2) startCameraPan();
    else stopCameraPan();
}
})();
