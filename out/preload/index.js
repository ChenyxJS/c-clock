"use strict";
const electron = require("electron");
const remote = require("@electron/remote");
const api = {
  quit: () => {
    electron.ipcRenderer.send("quit");
  },
  setWindowSize: (opt) => {
    electron.ipcRenderer.send("setWindowSize", opt);
  },
  tip: (option) => {
    console.log(option);
    const tip = new remote.Notification(option);
    tip.show();
  }
};
const electronAPI = {
  changeMode: (callback) => {
    electron.ipcRenderer.on("changeMode", (_, mode) => {
      callback(mode);
    });
  },
  changeDefaultTime: (callback) => {
    electron.ipcRenderer.on("changeDefaultTime", (_, time) => {
      callback(time);
    });
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
