(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, elements, state } = FNAE;

FNAE.hideHudForPowerOut = function hideHudForPowerOut() {
    const { office } = elements.images;
    const hudElements = [
        elements.cameraWindow,
        elements.taskBar,
        elements.camBarTop,
        elements.camBarBottom,
        elements.hud,
        document.getElementById("powerUsage"),
        document.getElementById("camHUD"),
        elements.controlTab,
        elements.camTab,
        elements.lightTab,
        elements.controlPanel,
        elements.escapeMenu,
        elements.muteBtn,
        elements.nightDisplay,
        elements.nightSkipPopup
    ];

    state.cameraOpen = false;
    state.lightOn = false;
    hudElements.forEach((element) => {
        if (element) element.style.display = "none";
    });

    if (office) {
        office.src = texturePath(gameConfig.assets.office.dark);
        office.style.display = "block";
    }
}
})();
