/* Shared classic-script bridge. Each function stays in its own source file. */
(() => {
    const FNAE = window.FNAE = window.FNAE || {};
    const functionNames = [
        "assignAssetSources", "preloadAssets", "playClick", "rampVolume", "startControlPanelAlarm", "stopControlPanelAlarm", "stopAllLoopingAudio",
        "initializeGame", "closeCameraWindow", "openCameraWindow", "restartCameras", "shutVents",
        "startCameraFlicker", "startCameraHealthTimer", "startCameraPan", "stopCameraFlicker",
        "stopCameraPan", "switchCamera", "triggerCameraError", "triggerMovementGlitch", "updateCameraPanState",
        "setupCameraButtons", "setupCameraTabToggle", "setupControlPanelToggle", "setupDecryptButton",
        "setupDecryptTabToggle", "setupDecryptWindowDragging", "setupEscapeMenu", "setupFinalScreenButton",
        "setupFinishButton", "setupLightTabToggle", "setupLureButton", "setupMuteButton", "setupNightSkipShortcut",
        "setupOfficePan", "setupPowerCheatShortcut", "setupQuitButton", "setupRestartControls", "setupStartButton",
        "endNightSixSequence", "startEndingCameraGlitch", "startNightFiveSleepSequence", "startNightSixEnding",
        "stopEndingCameraGlitch", "moveEnemy", "playLure", "triggerJumpscare", "endNight", "playNightPhoneCall",
        "startNight", "updateNightDisplay", "activatePowerCheat", "hideHudForPowerOut", "startPowerSystem", "updatePowerBars",
        "animateOfficePan", "refreshCameraImage", "updateOfficeImage"
    ];

    for (const name of functionNames) {
        Object.defineProperty(window, name, {
            configurable: true,
            enumerable: false,
            get: () => FNAE[name]
        });
    }
})();
