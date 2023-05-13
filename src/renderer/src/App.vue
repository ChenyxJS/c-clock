<script setup lang="ts">
import TimePanel from "@renderer/components/time/index.vue";
import Timer from "@renderer/components/timer/index.vue";
import BoxMenu from "@renderer/components/box-menu/index.vue";
import { reactive, watch } from "vue";
import { useAppStore } from "@renderer/store/modules/app";
import { useTimeStore } from "@renderer/store/modules/time";
import { TimerMode, TimerStatusMode } from "./types/GlobalEnum";

// 退出
const quit = () => window.api.quit();
const appStore = useAppStore();
const timeStore = useTimeStore();

// 切换计时模式
window.electron.changeMode((mode: TimerMode) => {
    appStore.changeMode(mode);
});

// 修改计时默认时间
window.electron.changeDefaultTime((time: number) => {
    timeStore.changeDefaultTime(time);
});

// 当及时状态改变为超时时发送提示
watch(
    () => timeStore.status,
    (newVal) => {
        if (newVal === TimerStatusMode.timeout) {
            window.api.tip({ title: "cClock提示", body: "时间到啦！" });
        }
    },
    { deep: true }
);

const state = reactive({
    boxMenuShow: false,
});
</script>

<template>
    <main id="main" @contextmenu="quit">
        <section>
            <time-panel
                v-if="appStore.mode === TimerMode.nomal"
                :fontSize="100"
                :color="appStore.color"
                :format="'HH:MM:SS'"
                :isTwentyFour="true"
            ></time-panel>
            <timer
                v-else
                :isFlicker="timeStore.status === TimerStatusMode.timeout"
                :fontSize="100"
                :color="appStore.color"
                @click="state.boxMenuShow = !state.boxMenuShow"
                :count="timeStore.timing"
            >
            </timer>
        </section>
        <section>
            <box-menu
                v-show="appStore.mode !== TimerMode.nomal && state.boxMenuShow"
            ></box-menu>
        </section>
    </main>
</template>
