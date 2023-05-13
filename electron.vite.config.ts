import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

import vue from "@vitejs/plugin-vue";

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        resolve: {
            alias: {
                "@renderer": resolve("src/renderer/src"),
            },
        },
        plugins: [
            vue(),
            Components({
                resolvers: [
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ["ep"],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
        ],
    },
});
