(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.closeCameraWindow = function closeCameraWindow() {
    const { cameraWindow, taskBar, camBarTop, camBarBottom } = elements;
    const { monitorStatic } = elements.audio;
    if (!cameraWindow || !taskBar) return;

    FNAE.cancelCameraFadeQueue?.();
    stopCameraPan();
    cameraWindow.style.opacity = 0;
    taskBar.style.opacity = 0;
    camBarTop.style.opacity = 0;
    camBarBottom.style.opacity = 0;

    setTimeout(() => {
        state.cameraOpen = false;
        cameraWindow.style.display = "none";
        if (monitorStatic) monitorStatic.pause();
        stopCameraFlicker();
    }, 520);
}
})();
