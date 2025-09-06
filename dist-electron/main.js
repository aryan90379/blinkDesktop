import { app as n, ipcMain as d, screen as h, BrowserWindow as p } from "electron";
import { fileURLToPath as g } from "node:url";
import t from "node:path";
const u = t.dirname(g(import.meta.url));
process.env.APP_ROOT = t.join(u, "..");
const c = process.env.VITE_DEV_SERVER_URL, T = t.join(process.env.APP_ROOT, "dist-electron"), m = t.join(process.env.APP_ROOT, "dist");
n.whenReady().then(() => {
  n.setLoginItemSettings({
    openAtLogin: !0,
    path: n.getPath("exe")
  });
});
process.env.VITE_PUBLIC = c ? t.join(process.env.APP_ROOT, "public") : m;
let e = null;
function f() {
  const s = h.getPrimaryDisplay(), { width: o } = s.workAreaSize, i = 135, r = 140, l = o - i, a = 200, w = t.join(process.env.APP_ROOT, "public", "build", "StoreLogo.png");
  e = new p({
    width: i,
    height: r,
    x: l,
    y: a,
    frame: !1,
    transparent: !0,
    resizable: !0,
    skipTaskbar: !1,
    focusable: !0,
    alwaysOnTop: !0,
    // Keep window on top
    hasShadow: !1,
    type: "normal",
    minWidth: 100,
    minHeight: 100,
    maxWidth: 500,
    maxHeight: 570,
    icon: w,
    // ← Here is the icon
    webPreferences: {
      preload: t.join(u, "preload.js")
    }
  }), e.setAlwaysOnTop(!0), e.setFocusable(!0), e.focus(), e.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 }), e.setFullScreenable(!1), c ? e.loadURL(c) : e.loadFile(t.join(m, "index.html")), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.on("closed", () => {
    e = null;
  });
}
const P = 4 / 3;
d.on("resize-window", (s, { width: o }) => {
  const i = Math.round(o / P), r = h.getPrimaryDisplay(), { width: l } = r.workAreaSize, a = l - o;
  e && e.setBounds({
    width: o,
    height: i,
    x: a,
    y: 0
  });
});
d.on("close-window", () => {
  e && (e.close(), e = null);
});
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  p.getAllWindows().length === 0 && f();
});
n.whenReady().then(() => {
  n.setLoginItemSettings({
    openAtLogin: !0,
    path: n.getPath("exe")
  }), n.setName("BlinkBuddy"), process.platform === "win32" && n.setAppUserModelId("Blinkbuddy"), f();
});
d.on("close-window", (s) => {
  const o = p.fromWebContents(s.sender);
  o && o.close();
});
export {
  T as MAIN_DIST,
  m as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};
