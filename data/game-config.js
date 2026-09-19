/*
 * Browser-readable copy of game-config.json.
 *
 * The JSON file remains the categorized data reference. This small script makes
 * the same data available when fnae.html is opened directly from disk, where a
 * browser is not allowed to import JSON modules from file:// URLs.
 */
(() => {
    const FNAE = window.FNAE = window.FNAE || {};

    FNAE.gameConfig = {
        app: { version: "5.8", mainMenuUrl: "index.html" },
        paths: { textures: "assets/TEXTURES", sounds: "assets/SFX" },
        assets: {
            preload: {
                textures: ["office.png", "cam1.jpg", "cam2.jpg", "cam1e.jpg", "cam2e.jpg", "color_bars.png", "err.png", "static.gif", "clock.png", "office3.png", "office3e.png", "jumpscare.png"],
                sounds: ["fan.wav", "monitor_static.wav", "click.wav", "powerout.wav", "beep.wav", "alerm.wav", "activate.wav", "damage.wav", "jumpscare.wav", "static3.wav", "camerasounds.wav", "over.wav", "phonecall1.wav", "phonecall2.wav", "phonecall3.wav", "phonecall4.wav", "phonecall5.wav", "phonecall6.wav", "alarmendg.wav", "static4.wav"]
            },
            images: {
                office: "office.png",
                cameraImage: "cam1.jpg",
                staticEl: "static.gif",
                errOverlay: "err.png",
                camClock: "clock.png",
                jumpscareImage: "jumpscare.png",
                deathStaticImage: "static.gif"
            },
            audio: {
                fanSound: "fan.wav",
                monitorStatic: "monitor_static.wav",
                buttonClick: "click.wav",
                powerOutAudio: "powerout.wav",
                beepSound: "beep.wav",
                alarmSound: "alerm.wav",
                activateSound: "activate.wav",
                damageSound: "damage.wav",
                jumpscareSound: "jumpscare.wav",
                static3Sound: "static3.wav",
                cameraPanSound: "camerasounds.wav",
                overSound: "over.wav",
                phonecall1Sound: "phonecall1.wav",
                phonecall2Sound: "phonecall2.wav",
                phonecall3Sound: "phonecall3.wav",
                phonecall4Sound: "phonecall4.wav",
                phonecall5Sound: "phonecall5.wav",
                phonecall6Sound: "phonecall6.wav",
                alarendgSound: "alarmendg.wav",
                static4Sound: "static4.wav"
            },
            office: { dark: "office.png", lit: "office3.png", enemyLit: "office3e.png" },
            cameraViews: {
                1: { default: "cam1.jpg", enemy: "cam1e.jpg" },
                2: { default: "cam2.jpg", enemy: "cam2e.jpg" },
                fallback: "color_bars.png"
            }
        },
        gameplay: {
            nightDurationMs: 600000,
            power: { startingAmount: 100, normalDrainPerSecond: 0.1166666667, targetRemainingAtNightEndByNight: { 1: 30, 2: 25, 3: 20, 4: 15, 5: 10 }, activeDeviceDrainPerSecond: 0.2777777778 },
            camera: {
                healthStartingAmount: 100,
                healthCheckIntervalMs: 15000,
                healthDamage: 20,
                healthDamageChance: 0.6,
                switchErrorStart: 7,
                switchErrorEnd: 10,
                switchErrorChance: 0.6,
                restartDurationMs: 5000,
                ventShutdownDurationMs: 3000
            },
            enemy: {
                initialMoveMinDelayMs: 12000,
                initialMoveRandomDelayMs: 25000,
                moveMinDelayMs: 10000,
                moveRandomDelayMs: 50000,
                movementTransitionMs: 220,
                movementCooldownMs: 3400,
                officeJumpscareDelayMs: 10000,
                lureMoveDelayMs: 1500,
                lureCooldownMs: 5000
            },
            ending: { nightSixDurationMs: 140000, deathStaticDurationMs: 30000, returnToMenuDelayMs: 4200 }
        }
    };
})();
