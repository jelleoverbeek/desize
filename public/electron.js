const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
// const sharp = require("sharp");

let mainWindow;

function devOptions() {
  if (isDev) {
    return { webSecurity: false, nodeIntegration: true };
  }
  return { nodeIntegration: true };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1280 : 580,
    height: isDev ? 800 : 400,
    minWidth: 530,
    minHeight: 380,
    titleBarStyle: "hiddenInset",
    webPreferences: devOptions()
  });

  if (isDev) {
    console.log("Running in development");
    mainWindow.webContents.openDevTools();
  } else {
    console.log("Running in production");
  }

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
