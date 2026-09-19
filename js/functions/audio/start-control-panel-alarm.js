(() => {
    const FNAE = window.FNAE;
    const { elements, state } = FNAE;

FNAE.startControlPanelAlarm = function startControlPanelAlarm() {
    const { alarmSound } = elements.audio;
    if (!alarmSound) return;

    stopControlPanelAlarm();
    alarmSound.loop = false;
    alarmSound.currentTime = 0;

    const replayAfterGap = () => {
        if (!state.errorPersistent || state.restarting || state.powerOut
            || elements.controlPanel.style.display !== "block") return;

        state.controlPanelAlarmGapTimer = setTimeout(() => {
            state.controlPanelAlarmGapTimer = null;
            if (!state.errorPersistent || state.restarting || state.powerOut
                || elements.controlPanel.style.display !== "block") return;

            alarmSound.currentTime = 0;
            alarmSound.play().catch(() => {});
        }, 300);
    };

    state.controlPanelAlarmEndedHandler = replayAfterGap;
    alarmSound.addEventListener("ended", replayAfterGap);
    alarmSound.play().catch(() => {});
}
})();
