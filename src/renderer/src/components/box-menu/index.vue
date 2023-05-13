<script setup lang="ts">
// import { reactive } from "vue";
import { useTimeStore } from "@renderer/store/modules/time";
import { useAppStore } from "@renderer/store/modules/app";
import { TimerMode, TimerStatusMode } from "@renderer/types/GlobalEnum";

const appStore = useAppStore();
const timeStore = useTimeStore();

// const state = reactive({
//     lock: false,
// });
</script>
<template>
    <div class="box">
        <div class="menu">
            <a class="menu-item" @click="timeStore.refresh()">
                <el-icon :size="20"><RefreshLeft /></el-icon>
            </a>
            <a class="menu-item" @click="timeStore.refresh_start()">
                <el-icon :size="20"><Refresh /></el-icon>
            </a>
            <a class="menu-item">
                <el-icon :size="20">
                    <VideoPause
                        @click="timeStore.stop()"
                        v-if="
                            timeStore.status === TimerStatusMode.start ||
                            timeStore.status === TimerStatusMode.timeout
                        "
                    />
                    <VideoPlay @click="timeStore.start()" v-else />
                </el-icon>
            </a>
            <!-- <a class="menu-item" @click="state.lock = !state.lock">
                <el-icon :size="20"
                    ><Lock v-show="state.lock" />
                    <Unlock v-show="!state.lock" />
                </el-icon>
            </a> -->
            <a class="menu-item" @click="appStore.changeMode(TimerMode.nomal)">
                <el-icon :size="20"><CircleClose /></el-icon>
            </a>
        </div>
    </div>
</template>
<style scoped>
.box {
    display: flex;
    justify-content: center;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    min-width: 160px;
    height: 40px;
    min-height: 40px;
    color: #030303;
    background-color: #f0efef;
    border-radius: 12px;
}

.menu-item {
    display: flex;
    cursor: pointer;
}
</style>
