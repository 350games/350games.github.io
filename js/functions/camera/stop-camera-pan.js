(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.stopCameraPan = function stopCameraPan() {
    const { cameraImage } = elements.images;
    const { cameraPanSound } = elements.audio;
    if (!cameraImage || !cameraPanSound) return;

    cameraImage.classList.remove("camera-pan");
    cameraPanSound.pause();
}
})();
