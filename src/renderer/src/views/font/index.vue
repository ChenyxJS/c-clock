<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
    title: "font setting",
});
</script>
<template>{{ state.title }}</template>
