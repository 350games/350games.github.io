(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.rampVolume = function rampVolume(audio, targetVolume, durationMs) {
    if (!audio) return;

    const startVolume = audio.volume;
    const steps = 12;
    const stepDuration = durationMs / steps;
    let step = 0;

    const interval = setInterval(() => {
        step += 1;
        audio.volume = startVolume + (targetVolume - startVolume) * (step / steps);
        if (step >= steps) {
            audio.volume = targetVolume;
            clearInterval(interval);
        }
    }, stepDuration);
}
})();
