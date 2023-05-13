import { TimerMode } from "@renderer/types/GlobalEnum";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useTimeStore } from "./time";

export const useAppStore = defineStore("app", {
    state: () =>
        reactive({
            // 默认为倒计时模式
            mode: TimerMode.nomal,
            // 默认字体颜色
            color: "#ffe0b2",
        }),
    actions: {
        // 切换模式
        changeMode(mode: TimerMode) {
            // 切换模式时我们需要初始化计时器
            this.mode = mode;
            useTimeStore().init();
        },
        // 修改颜色
        changeColor(color: string) {
            this.color = color;
        },
    },
    persist: {
        key: "appStore",
        paths: ["mode", "color"],
        storage: localStorage,
    },
});
// 非setup
export function useAppStoreHook() {
    return useAppStore();
}
