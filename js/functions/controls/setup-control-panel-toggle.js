(() => {
    const FNAE = window.FNAE;
    const { elements, state } = FNAE;

FNAE.setupControlPanelToggle = function setupControlPanelToggle() {
    elements.controlTab.addEventListener("click", () => {
        if (state.restarting || state.powerOut) return;

        if (state.controlPanelAlarmTimer) {
            clearTimeout(state.controlPanelAlarmTimer);
            state.controlPanelAlarmTimer = null;
        }

        playClick();
        elements.controlPanel.style.display = elements.controlPanel.style.display === "block" ? "none" : "block";
        if (state.errorPersistent && elements.controlPanel.style.display === "block") {
            // The control-panel error alarm intentionally begins 0.2 seconds later.
            state.controlPanelAlarmTimer = setTimeout(() => {
                state.controlPanelAlarmTimer = null;
                if (state.errorPersistent && elements.controlPanel.style.display === "block") {
                    startControlPanelAlarm();
                }
            }, 200);
        } else {
            stopControlPanelAlarm();
        }
    });
}
})();
