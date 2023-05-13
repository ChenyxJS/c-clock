import { TimerMode, TimerStatusMode } from "@renderer/types/GlobalEnum";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useAppStore } from "./app";

export const useTimeStore = defineStore("time", {
    state: () =>
        reactive({
            // 默认时间10秒
            defaultTime: 3,
            // 倒计时时间
            timing: 3,
            // 计时器
            timer: {} as NodeJS.Timer,
            // 计时状态
            status: TimerStatusMode.stop,
        }),
    actions: {
        // 初始化计时器
        init() {
            clearInterval(this.timer);
            this.$reset();
            this.initTiming();
        },
        initTiming() {
            const appStore = useAppStore();
            // 判断当前模式
            if (appStore.mode === TimerMode.reverse) {
                this.timing = this.defaultTime;
            } else {
                this.timing = 0;
            }
        },
        // 修改默认时间
        changeDefaultTime(time: number) {
            this.defaultTime = time;
        },
        // 修改颜色
        // 重置计时并开始
        refresh_start() {
            this.initTiming();
            this.start();
        },
        // 重置计时不开始
        refresh() {
            this.stop();
            this.initTiming();
        },
        // 开启计时
        start() {
            const appStore = useAppStore();
            // 若计时已开启，则先清除计时器
            if (this.status === TimerStatusMode.start)
                clearInterval(this.timer);
            // 计时开启
            this.status = TimerStatusMode.start;
            this.timer = setInterval(() => {
                // 首先判断计时模式
                if (appStore.mode === TimerMode.reverse) {
                    // 倒计时模式超时
                    if (this.timing <= 0) {
                        this.status = TimerStatusMode.timeout;
                    }
                    this.timing = this.timing - 1;
                } else {
                    // 正计时模式超时
                    if (this.timing >= this.defaultTime) {
                        this.status = TimerStatusMode.timeout;
                    }
                    this.timing = this.timing + 1;
                }
            }, 1000);
        },
        // 停止计时
        stop() {
            this.status = TimerStatusMode.stop;
            clearInterval(this.timer);
        },
    },
    persist: {
        key: "timeStore",
        paths: ["defaultTime"],
        storage: localStorage,
    },
});
// 非setup
export function useTimeStoreHook() {
    return useTimeStore();
}
