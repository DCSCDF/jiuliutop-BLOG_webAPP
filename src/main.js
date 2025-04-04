import { createApp } from 'vue';
import App from './App.vue';
import { router } from './common/router';
import axios from 'axios';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import { createDiscreteApi } from 'naive-ui';
import { AdminStore } from './stores/AdminStore';
import * as echarts from 'echarts'
import { API } from "./api.js"
//vue3.0取消了Vue.prototype，官方文档推荐使用globalProperties


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // 实心图标
import { far } from '@fortawesome/free-regular-svg-icons'; // 常规图标
import { fab } from '@fortawesome/free-brands-svg-icons'; // 品牌图标


// 将图标添加到库中
library.add(fas, far, fab);
const { message, notification, dialog } = createDiscreteApi(["message", "notification", "dialog"]);


// 创建app实例
const app = createApp(App);
// 定义项目名称和状态信息
const projectStatus = {
    // version: "1.0.0",
    // status: "Running",
    // description: "BLOG项目.",
    author: "JiuLiuTOP",
    repository: "https://github.com/DCSCDF/jiuliutop-BLOG_webAPP"
};

console.table(projectStatus);
app.config.globalProperties.$echarts = echarts
app.provide("message", message);
app.provide("notification", notification);
app.provide("dialog", dialog);
app.provide("axios", axios);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(naive);
app.use(createPinia());
app.use(router);

const adminStore = AdminStore()
// axios 服务端IP接口
axios.defaults.baseURL = API.Url; // 网站后端API地址
axios.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})

app.provide("server_url", axios.defaults.baseURL);
app.mount('#jiuliu_out');


