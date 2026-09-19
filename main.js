const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true,
    autoHideMenuBar: true,
    frame: true,
    resizable: true,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      contextIsolation: true
    }
  });

  // Keep Electron's native context menu disabled for every page in the game.
  win.webContents.on('context-menu', (event) => event.preventDefault());

  win.loadFile('index.html');

  // Optional: force fullscreen again after load just in case
  win.once('ready-to-show', () => {
    win.setFullScreen(true);
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
