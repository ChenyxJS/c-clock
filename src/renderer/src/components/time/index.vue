<script setup lang="ts">
import { formatDate } from "@renderer/utils";
import { computed, onMounted, onUnmounted, reactive } from "vue";

const props = defineProps({
    format: {
        type: String,
        default: "HH:MM:SS",
    },
    isTwentyFour: {
        type: Boolean,
        default: true,
    },
    fontSize: {
        type: Number,
        default: 50,
    },
    color: {
        type: String,
        default: "#ffe0b2",
    },
});

const state = reactive({
    time: new Date().getTime(),
    timer: {} as any,
});

onMounted(() => {
    initTime();
});

onUnmounted(() => {
    clearInterval(state.timer);
});

const timeObj = computed(() => {
    return formatDate(String(state.time), props.isTwentyFour, props.format);
});

function initTime() {
    state.timer = setInterval(() => (state.time = new Date().getTime()), 1000);
}
</script>

<template>
    <div class="time">
        <span
            class="time-text"
            :style="{
                fontSize: fontSize + 'px',
                color: color,
            }"
            >{{ timeObj.formatStr }}</span
        >
        <span
            v-show="!isTwentyFour"
            :style="{
                fontSize: fontSize / 2 + 'px',
                color: color,
                lineHeight: 75 + '%',
            }"
            >{{ timeObj.suffix }}</span
        >
    </div>
</template>

<style lang="scss" scoped>
.time {
    display: flex;
    justify-content: center;
}

.time-text {
    line-height: 75%;
    text-align: center;
    letter-spacing: 5px;
    user-select: none;
}
</style>
