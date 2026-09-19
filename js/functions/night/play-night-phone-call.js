(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.playNightPhoneCall = function playNightPhoneCall() {
    if (state.currentPhoneCall) state.currentPhoneCall.pause();

    const phoneCalls = {
        1: elements.audio.phonecall1Sound,
        2: elements.audio.phonecall2Sound,
        3: elements.audio.phonecall3Sound,
        4: elements.audio.phonecall4Sound,
        5: elements.audio.phonecall5Sound,
        6: elements.audio.phonecall6Sound
    };
    const callAudio = phoneCalls[state.currentNight] ?? phoneCalls[6];
    if (!callAudio) return;

    callAudio.currentTime = 0;
    callAudio.volume = 0.85;
    callAudio.loop = false;
    callAudio.play().catch(() => {});
    state.currentPhoneCall = callAudio;
    callAudio.onended = () => {
        if (state.currentPhoneCall !== callAudio) return;
        state.currentPhoneCall = null;
        elements.muteBtn.style.display = "none";
    };
}
})();
