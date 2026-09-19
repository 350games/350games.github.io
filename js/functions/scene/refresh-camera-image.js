(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.refreshCameraImage = function refreshCameraImage() {
    const { cameraImage } = elements.images;
    if (!state.cameraOpen || !cameraImage) return;

    const cameraView = gameConfig.assets.cameraViews[String(state.currentCam)];
    let fileName = cameraView?.default ?? gameConfig.assets.cameraViews.fallback;

    if (cameraView && state.enemyPosition === `cam${state.currentCam}`) {
        fileName = cameraView.enemy;
    }

    cameraImage.src = texturePath(fileName);
}
})();
