import { app, ipcMain, screen, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe")
  });
});
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win = null;
function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width: screenWidth } = display.workAreaSize;
  const winWidth = 135;
  const winHeight = 140;
  const windowX = screenWidth - winWidth;
  const windowY = 200;
  const iconPath = path.join(process.env.APP_ROOT, "public", "build", "StoreLogo.png");
  win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: windowX,
    y: windowY,
    frame: false,
    transparent: true,
    resizable: true,
    skipTaskbar: false,
    focusable: true,
    alwaysOnTop: true,
    // Keep window on top
    hasShadow: false,
    type: "normal",
    minWidth: 100,
    minHeight: 100,
    maxWidth: 500,
    maxHeight: 570,
    icon: iconPath,
    // ← Here is the icon
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.setAlwaysOnTop(true);
  win.setFocusable(true);
  win.focus();
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setFullScreenable(false);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.on("closed", () => {
    win = null;
  });
}
const ASPECT_RATIO = 4 / 3;
ipcMain.on("resize-window", (_event, { width }) => {
  const height = Math.round(width / ASPECT_RATIO);
  const display = screen.getPrimaryDisplay();
  const { width: screenWidth } = display.workAreaSize;
  const newX = screenWidth - width;
  const newY = 0;
  if (win) {
    win.setBounds({
      width,
      height,
      x: newX,
      y: newY
    });
  }
});
ipcMain.on("close-window", () => {
  if (win) {
    win.close();
    win = null;
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe")
  });
  app.setName("BlinkBuddy");
  if (process.platform === "win32") {
    app.setAppUserModelId("Blinkbuddy");
  }
  createWindow();
});
ipcMain.on("close-window", (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) window.close();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
