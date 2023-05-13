<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    count: {
        type: Number,
        default: 0,
    },
    format: {
        type: String,
        default: "HH:mm:ss",
    },
    fontSize: {
        type: Number,
        default: 50,
    },
    color: {
        type: String,
        default: "#ffe0b2",
    },
    isFlicker: {
        type: Boolean,
        default: false,
    },
});

const time = computed(() => {
    let pre = "";
    let count = props.count;
    if (count < 0) {
        pre = "-";
        count = Math.abs(count);
    }
    let hour = Math.floor(count / 3600);
    let minute = Math.floor((count - hour * 3600) / 60);
    // 计算秒数不保留小数点
    let second = Math.floor(count - hour * 3600 - minute * 60);
    let hourStr = hour >= 10 ? hour.toString() : "0" + hour;
    let minuteStr = minute >= 10 ? minute.toString() : "0" + minute;
    let secondStr = second >= 10 ? second.toString() : "0" + second;
    if (hourStr !== "00") {
        return `${pre}${hourStr}:${minuteStr}:${secondStr}`;
    } else {
        return `${pre}${minuteStr}:${secondStr}`;
    }
});
</script>

<template>
    <!-- 倒计时 -->
    <div class="countdown">
        <span
            class="time-text"
            :class="['time-text', { flicker: isFlicker }]"
            :style="{
                fontSize: fontSize + 'px',
                color: color,
            }"
            >{{ time }}</span
        >
    </div>
</template>

<style lang="scss" scoped>
.countdown {
    display: flex;
    justify-content: center;
}

.time-text {
    line-height: 75%;
    text-align: center;
    letter-spacing: 5px;
    user-select: none;
}

.flicker {
    animation: flicker 1s linear infinite;
}

@keyframes flicker {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>
