"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => electron.ipcRenderer.send("close-window")
});
