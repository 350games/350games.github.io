const { app, BrowserWindow } = require("electron");
const path = require("path");

const failures = [];
let gameWindow;
const appRoot = process.env.FNAE_APP_ROOT || path.join(__dirname, "..");

function finish(exitCode) {
    if (gameWindow && !gameWindow.isDestroyed()) gameWindow.destroy();
    process.exitCode = exitCode;
    app.quit();
}

function fail(message) {
    failures.push(message);
    console.error(message);
    finish(1);
}

app.whenReady().then(async () => {
    gameWindow = new BrowserWindow({
        show: false,
        webPreferences: { contextIsolation: true }
    });

    gameWindow.webContents.on("console-message", (_event, level, message, lineNumber, sourceId) => {
        if (level >= 3) fail(`Renderer error at ${sourceId}:${lineNumber}: ${message}`);
    });
    gameWindow.webContents.on("did-fail-load", (_event, errorCode, errorDescription, validatedUrl) => {
        fail(`Failed to load ${validatedUrl}: ${errorCode} ${errorDescription}`);
    });
    gameWindow.webContents.on("render-process-gone", (_event, details) => {
        fail(`Renderer process exited: ${details.reason}`);
    });

    try {
        await gameWindow.loadFile(path.join(appRoot, "index.html"));
        await gameWindow.webContents.executeJavaScript("document.getElementById('startBtn').click()");
        const deadline = Date.now() + 30000;

        const poll = async () => {
            if (failures.length) return;
            if (!gameWindow.webContents.getURL().endsWith("/fnae.html")) {
                if (Date.now() >= deadline) return fail("The main menu did not navigate to fnae.html.");
                setTimeout(() => poll().catch((error) => fail(error.stack || error.message)), 250);
                return;
            }

            const readyState = await gameWindow.webContents.executeJavaScript("document.body.dataset.fnaeReady || ''");
            if (readyState === "error") {
                const message = await gameWindow.webContents.executeJavaScript("document.body.dataset.fnaeError || 'Unknown error'");
                return fail(`Game initialization reported an error: ${message}`);
            }
            if (readyState !== "true") {
                if (Date.now() >= deadline) return fail("Timed out while waiting for FNAE to initialize.");
                setTimeout(() => poll().catch((error) => fail(error.stack || error.message)), 250);
                return;
            }

            const passed = await gameWindow.webContents.executeJavaScript(`
                (async () => {
                    const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
                    if (!document.getElementById("office").getAttribute("src") || !document.getElementById("fanSound").getAttribute("src")) return false;

                    document.getElementById("startButton").click();
                    document.getElementById("decryptBtn").click();
                    document.getElementById("finishBtn").click();
                    if (document.getElementById("nightDisplay").style.display !== "block") return false;

                    document.getElementById("camTab").click();
                    await pause(25);
                    document.querySelector('[data-camera="2"]').click();
                    document.querySelector('[data-camera="3"]').click();
                    const firstFadeWins = window.FNAE.state.currentCam === 2 && window.FNAE.state.cameraTransitionActive;

                    await pause(1100);
                    document.querySelector('[data-camera="4"]').click();
                    const cameraBarWorks = window.FNAE.state.currentCam === 4 && window.FNAE.state.cameraTransitionActive;
                    window.FNAE.triggerMovementGlitch();
                    const movementStaticWins = window.FNAE.state.movementStaticActive
                        && window.FNAE.state.cameraTransitionActive
                        && window.FNAE.state.cameraFadeTimers.length === 2;

                    await pause(1100);
                    window.FNAE.state.currentCam = 2;
                    window.FNAE.state.enemyPosition = "cam2";
                    window.FNAE.state.lightOn = true;
                    window.FNAE.updateOfficeImage();
                    const officeLightWorks = document.getElementById("office").src.endsWith("/office3.png");
                    window.FNAE.state.canMove = true;
                    window.FNAE.moveEnemy();
                    await pause(300);
                    const officeEntryLightOffWorks = window.FNAE.state.enemyPosition === "office"
                        && !window.FNAE.state.lightOn
                        && document.getElementById("office").src.endsWith("/office.png");
                    window.FNAE.playLure();
                    await pause(1600);
                    const officeLureWorks = window.FNAE.state.enemyPosition === "cam2"
                        && window.FNAE.state.officeTimer === null
                        && !window.FNAE.state.isJumpscaring
                        && !window.FNAE.state.lightOn
                        && document.getElementById("office").src.endsWith("/office.png");

                    window.FNAE.state.errorPersistent = true;
                    document.getElementById("controlTab").click();
                    const errorAlarmIsDelayed = window.FNAE.state.controlPanelAlarmTimer !== null;
                    await pause(250);
                    const alarmSound = document.getElementById("alarmSound");
                    const controlPanelAlarmUsesGap = alarmSound.loop === false
                        && typeof window.FNAE.state.controlPanelAlarmEndedHandler === "function";
                    alarmSound.dispatchEvent(new Event("ended"));
                    const controlPanelAlarmGapWorks = window.FNAE.state.controlPanelAlarmGapTimer !== null;
                    document.getElementById("controlTab").click();
                    const controlPanelAlarmStopsCleanly = window.FNAE.state.controlPanelAlarmGapTimer === null
                        && window.FNAE.state.controlPanelAlarmEndedHandler === null;
                    window.FNAE.state.errorPersistent = false;

                    window.FNAE.state.power = 0;
                    await pause(1100);
                    const powerOutHidesHud = window.FNAE.state.powerOut
                        && !window.FNAE.state.cameraOpen
                        && !window.FNAE.state.lightOn
                        && ["cameraWindow", "taskBar", "hud", "powerUsage", "camHUD", "nightDisplay", "controlTab", "camTab", "lightTab"]
                            .every((id) => document.getElementById(id).style.display === "none")
                        && document.getElementById("office").style.display === "block"
                        && document.getElementById("office").src.endsWith("/office.png");

                    window.FNAE.updateNightDisplay();
                    const powerOutClockStaysHidden = document.getElementById("nightDisplay").style.display === "none";

                    window.FNAE.state.lightOn = true;
                    window.FNAE.triggerJumpscare();
                    const jumpscareUsesNormalOffice = !window.FNAE.state.lightOn
                        && document.getElementById("office").src.endsWith("/office.png");
                    await pause(7200);
                    const deathStatic = document.getElementById("deathStatic");
                    const deathTitleWorks = deathStatic.style.display === "block"
                        && deathStatic.style.opacity === "1"
                        && document.getElementById("gameOverText").style.opacity === "1"
                        && document.getElementById("deathContinue").style.opacity === "0"
                        && document.getElementById("hud").style.display === "none"
                        && document.getElementById("nightDisplay").style.display === "none"
                        && document.getElementById("office").style.display === "none"
                        && !window.FNAE.state.isNightActive;

                    await pause(5000);
                    const deathContinueWorks = document.getElementById("deathContinue").style.opacity === "1";
                    deathStatic.click();
                    const deathExitFadeWorks = deathStatic.style.opacity === "0"
                        && document.getElementById("gameOverText").style.opacity === "0"
                        && document.getElementById("deathContinue").style.opacity === "0";

                    const targetPowerByNight = window.FNAE.gameConfig.gameplay.power.targetRemainingAtNightEndByNight;
                    const durationIsTenMinutes = window.FNAE.gameConfig.gameplay.nightDurationMs === 600000;
                    const powerTargetsWork = [30, 25, 20, 15, 10].every((target, index) => {
                        const night = index + 1;
                        const drain = (100 - targetPowerByNight[night]) / 600;
                        return targetPowerByNight[night] === target && Math.abs(100 - (drain * 600) - target) < 0.0001;
                    });
                    const activeDeviceDrainWorks = window.FNAE.gameConfig.gameplay.power.activeDeviceDrainPerSecond
                        > (100 - targetPowerByNight[1]) / 600;

                    return firstFadeWins && cameraBarWorks && movementStaticWins && officeLightWorks && officeEntryLightOffWorks
                        && officeLureWorks && errorAlarmIsDelayed && controlPanelAlarmUsesGap && controlPanelAlarmGapWorks
                        && controlPanelAlarmStopsCleanly && powerOutHidesHud && jumpscareUsesNormalOffice && deathTitleWorks
                        && deathContinueWorks && deathExitFadeWorks && durationIsTenMinutes && powerTargetsWork
                        && activeDeviceDrainWorks && powerOutClockStaysHidden;
                })()
            `);
            if (!passed) return fail("Camera bar, transition, alarm delay, or death screen did not initialize.");
            process.stdout.write("FNAE smoke test passed.\n");
            return setTimeout(() => finish(0), 10);
        };

        poll().catch((error) => fail(error.stack || error.message));
    } catch (error) {
        fail(error.stack || error.message);
    }
});
