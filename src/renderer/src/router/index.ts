/*
 * @Descripttion:
 * @version:
 * @Author: Chenyx
 * @Date: 2022-10-12 23:24:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-05-13 18:39:37
 */
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes = [] as RouteRecordRaw[];

// 生产环境使用web
const history = createWebHashHistory();

const router = createRouter({
    history,
    routes,
});

export default router;
