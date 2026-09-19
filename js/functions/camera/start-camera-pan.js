(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.startCameraPan = function startCameraPan() {
    const { cameraImage } = elements.images;
    const { cameraPanSound } = elements.audio;
    if (!cameraImage || !cameraPanSound) return;

    cameraImage.classList.add("camera-pan");
    cameraPanSound.loop = true;
    cameraPanSound.currentTime = 0;
    cameraPanSound.volume = 0.25;
    cameraPanSound.play().catch(() => {});
}
})();
