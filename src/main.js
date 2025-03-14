import { createApp } from 'vue';
import App from './App.vue';
import { router } from './common/router';
import axios from 'axios';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import { createDiscreteApi } from 'naive-ui';
import themeOverrides from './themeOverrides'; // 引入自定义主题
import { AdminStore } from './stores/AdminStore';
import store from './stores/VuexStore'; // 确保导入 store
import "./assets/css/text.css";
import * as echarts from 'echarts'
import { API } from "./api.js"
//vue3.0取消了Vue.prototype，官方文档推荐使用globalProperties


const { message, notification, dialog } = createDiscreteApi(["message", "notification", "dialog"]);
// 添加请求拦截器
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('admin_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

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

app.use(naive);
app.use(createPinia());
app.use(router);
app.use(store); // 注册 store

const adminStore = AdminStore()
// axios 服务端IP接口
axios.defaults.baseURL = API.Url; // 网站后端API地址
axios.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})

app.provide("server_url", axios.defaults.baseURL);
app.mount('#jiuliu_out');


