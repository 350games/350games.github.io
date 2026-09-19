(() => {
    const FNAE = window.FNAE;
    const { elements, state } = FNAE;

FNAE.stopControlPanelAlarm = function stopControlPanelAlarm() {
    const { alarmSound } = elements.audio;
    if (state.controlPanelAlarmGapTimer) {
        clearTimeout(state.controlPanelAlarmGapTimer);
        state.controlPanelAlarmGapTimer = null;
    }
    if (alarmSound && state.controlPanelAlarmEndedHandler) {
        alarmSound.removeEventListener("ended", state.controlPanelAlarmEndedHandler);
    }
    state.controlPanelAlarmEndedHandler = null;

    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmSound.loop = false;
    }
}
})();
