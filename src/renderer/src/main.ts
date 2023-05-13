import { createApp, watch } from "vue";
import router from "@renderer/router";

import App from "./App.vue";
const app = createApp(App);

import "@renderer/assets/css/index.scss";

// ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 注册icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

import { setupStore } from "@renderer/store";

// 全局挂载

setupStore(app);
app.use(router);

app.use(ElementPlus);
app.mount("#app");
