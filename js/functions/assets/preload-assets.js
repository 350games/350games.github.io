(() => {
    const FNAE = window.FNAE;
    const { gameConfig, texturePath, soundPath, elements, state } = FNAE;

FNAE.preloadAssets = async function preloadAssets() {
    const texturePromises = gameConfig.assets.preload.textures.map((fileName) => new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = () => {
            console.warn(`Missing texture: ${fileName}`);
            resolve();
        };
        image.src = texturePath(fileName);
    }));

    const soundPromises = gameConfig.assets.preload.sounds.map((fileName) => new Promise((resolve) => {
        const audio = new Audio();
        audio.oncanplaythrough = resolve;
        audio.onerror = () => {
            console.warn(`Missing sound: ${fileName}`);
            resolve();
        };
        audio.src = soundPath(fileName);
        audio.load();
    }));

    await Promise.all([...texturePromises, ...soundPromises]);
}
})();
