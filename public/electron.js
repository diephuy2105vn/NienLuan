const path = require("path");

const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        icon: "./src/assets/Logo.png",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });
    win.maximize();
    win.setMenu(null);
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
}

ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = "light";
    } else {
        nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
});

app.whenReady().then(createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
