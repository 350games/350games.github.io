(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.stopAllLoopingAudio = function stopAllLoopingAudio() {
    const { fanSound, monitorStatic, beepSound, alarmSound } = elements.audio;
    stopControlPanelAlarm?.();
    if (fanSound) fanSound.volume = 0;

    [monitorStatic, beepSound, alarmSound].forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    });
}
})();
