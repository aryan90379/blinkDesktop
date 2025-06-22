import { app as t, ipcMain as d, screen as h, BrowserWindow as w } from "electron";
import { fileURLToPath as R } from "node:url";
import o from "node:path";
const m = o.dirname(R(import.meta.url));
process.env.APP_ROOT = o.join(m, "..");
const c = process.env.VITE_DEV_SERVER_URL, O = o.join(process.env.APP_ROOT, "dist-electron"), u = o.join(process.env.APP_ROOT, "dist");
t.whenReady().then(() => {
  t.setLoginItemSettings({
    openAtLogin: !0,
    path: t.getPath("exe")
  });
});
process.env.VITE_PUBLIC = c ? o.join(process.env.APP_ROOT, "public") : u;
let e = null;
function f() {
  const s = h.getPrimaryDisplay(), { width: n } = s.workAreaSize, i = 300, r = 300, a = n - i, l = 0, p = o.join(process.env.APP_ROOT, "public", "icon.ico");
  e = new w({
    width: i,
    height: r,
    x: a,
    y: l,
    frame: !1,
    transparent: !0,
    resizable: !0,
    skipTaskbar: !0,
    focusable: !0,
    alwaysOnTop: !0,
    hasShadow: !1,
    type: "toolbar",
    minWidth: 140,
    minHeight: 120,
    maxWidth: 400,
    maxHeight: 500,
    icon: p,
    // ← Here is the icon
    webPreferences: {
      preload: o.join(m, "preload.js")
    }
  }), e.setAlwaysOnTop(!0, "screen-saver"), e.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 }), e.setFullScreenable(!1), c ? e.loadURL(c) : e.loadFile(o.join(u, "index.html")), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.on("closed", () => {
    e = null;
  });
}
const P = 4 / 3;
d.on("resize-window", (s, { width: n }) => {
  const i = Math.round(n / P), r = h.getPrimaryDisplay(), { width: a } = r.workAreaSize, l = a - n;
  e && e.setBounds({
    width: n,
    height: i,
    x: l,
    y: 0
  });
});
d.on("close-window", () => {
  e && (e.close(), e = null);
});
t.on("window-all-closed", () => {
  process.platform !== "darwin" && (t.quit(), e = null);
});
t.on("activate", () => {
  w.getAllWindows().length === 0 && f();
});
t.whenReady().then(() => {
  f();
});
d.on("close-window", (s) => {
  const n = w.fromWebContents(s.sender);
  n && n.close();
});
export {
  O as MAIN_DIST,
  u as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};
