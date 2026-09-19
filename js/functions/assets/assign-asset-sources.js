(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.assignAssetSources = function assignAssetSources() {
    for (const [elementName, fileName] of Object.entries(gameConfig.assets.images)) {
        const image = elements.images[elementName];
        if (image) image.src = texturePath(fileName);
    }

    for (const [elementName, fileName] of Object.entries(gameConfig.assets.audio)) {
        const audio = elements.audio[elementName];
        if (audio) audio.src = soundPath(fileName);
    }
}
})();
