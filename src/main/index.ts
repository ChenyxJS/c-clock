import { app, shell, BrowserWindow } from "electron";
import { join } from "path";
import "./ipcMain";
import createTray from "./tray";
import "./windowSize";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/IconTemplate@2x.png?asset";
import remote from "@electron/remote/main";

const isMac = process.platform === "darwin";

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 200,
        height: 90,
        show: false,
        frame: false,
        skipTaskbar: false,
        transparent: true,
        alwaysOnTop: true,
        hasShadow: false,
        autoHideMenuBar: true,
        ...(process.platform === "linux" ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false,
        },
    });

    // 开发模式自动打开开发者工具
    // if (is.dev) mainWindow.webContents.openDevTools()

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
    return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // 设置APPID
    electronApp.setAppUserModelId("cyx.clock");

    // 调试工具开发模式F12，生产模式com或ctrl + R
    app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    // 创建窗口
    const mainwindow = createWindow();
    remote.initialize();
    remote.enable(mainwindow.webContents);
    // 托盘图标
    createTray(mainwindow);
    // 当窗口数为零时点击app创建新的创建窗口
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    // 隐藏 dock 图标
    app.dock.hide();
});

// app窗口关闭时，mac系统不直接退出
app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});
