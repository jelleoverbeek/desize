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
    width: isDev ? 1280 : 640,
    height: isDev ? 800 : 480,
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

  // // Create the Application's main menu
  // var template = [
  //   {
  //     label: "Img Tool",
  //     submenu: [
  //       {
  //         label: "About Img Tool",
  //         selector: "orderFrontStandardAboutPanel:"
  //       },
  //       { type: "separator" },
  //       {
  //         label: "Quit",
  //         accelerator: "Command+Q",
  //         click: function() {
  //           app.quit();
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     label: "Edit",
  //     submenu: [
  //       { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
  //       { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
  //       { type: "separator" },
  //       { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
  //       { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
  //       { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
  //       {
  //         label: "Select All",
  //         accelerator: "CmdOrCtrl+A",
  //         selector: "selectAll:"
  //       },
  //       {
  //         label: "Dev tools",
  //         accelerator: "CmdOrCtrl+J",
  //         click() {
  //           mainWindow.webContents.openDevTools();
  //         }
  //       }
  //     ]
  //   }
  // ];

  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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
