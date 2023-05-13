import type { App } from "vue";
import { createPinia } from "pinia";
//pinia
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);

// 全局挂载store
export function setupStore(app: App<Element>) {
    app.use(store);
}

export { store };
