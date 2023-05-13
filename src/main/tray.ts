import { BrowserWindow, Menu, shell, Tray } from "electron";
import path from "path";
import { TimerMode } from "../renderer/src/types/GlobalEnum";

const createTray = (mainWindow: BrowserWindow) => {
    const tray = new Tray(
        path.resolve(
            __dirname,
            process.platform == "darwin"
                ? "../../resources/IconTemplate@2x.png"
                : "../../resources/IconTemplate@2x.png"
        )
    );
    // 设置托盘菜单栏
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "计时模式",
            submenu: [
                {
                    label: "正计时",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeMode",
                            TimerMode.positive
                        ),
                },
                {
                    label: "倒计时",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeMode",
                            TimerMode.reverse
                        ),
                },
            ],
        },
        {
            label: "计时时间",
            submenu: [
                {
                    label: "60min",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            60 * 60
                        ),
                },
                {
                    label: "30min",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            30 * 60
                        ),
                },
                {
                    label: "15min",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            15 * 60
                        ),
                },
                {
                    label: "10min",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            10 * 60
                        ),
                },
                {
                    label: "5min",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            5 * 60
                        ),
                },
                {
                    label: "1min",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            1 * 60
                        ),
                },
                {
                    label: "自定义",
                    type: "radio",
                    click: () =>
                        mainWindow.webContents.send(
                            "changeDefaultTime",
                            1 * 60
                        ),
                },
            ],
        },
        {
            label: "字体",
            click: () => {},
        },
        {
            label: "见万事如流",
            click: () => shell.openExternal("http://www.chenyx.site"),
        },
        { label: "退出", role: "quit" },
    ]);
    tray.setToolTip("c-clock");
    tray.setContextMenu(contextMenu);
};

export default createTray;
