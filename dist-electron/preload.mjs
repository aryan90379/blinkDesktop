"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electronAPI",{closeWindow:()=>e.ipcRenderer.send("close-window")});
