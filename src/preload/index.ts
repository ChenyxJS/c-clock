import {
    NotificationConstructorOptions,
    contextBridge,
    ipcRenderer,
} from "electron";
import { TimerMode } from "../renderer/src/types/GlobalEnum";
import { Notification } from "@electron/remote";

// Custom APIs for renderer
const api = {
    quit: () => {
        ipcRenderer.send("quit");
    },
    setWindowSize: (opt: any) => {
        ipcRenderer.send("setWindowSize", opt);
    },
    tip: (option: NotificationConstructorOptions) => {
        const tip = new Notification(option);
        tip.show();
    },
};

const electronAPI = {
    changeMode: (callback) => {
        ipcRenderer.on("changeMode", (_, mode: TimerMode) => {
            callback(mode);
        });
    },
    changeDefaultTime: (callback) => {
        ipcRenderer.on("changeDefaultTime", (_, time: number) => {
            callback(time);
        });
    },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI);
        contextBridge.exposeInMainWorld("api", api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}
