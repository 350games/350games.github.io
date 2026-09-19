(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.setupCameraButtons = function setupCameraButtons() {
    elements.cameraButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cameraNumber = Number.parseInt(button.dataset.camera, 10);
            if (!state.cameraOpen || !Number.isInteger(cameraNumber)) return;
            FNAE.switchCamera(cameraNumber);
        });
    });
}
})();
