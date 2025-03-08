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
axios.defaults.baseURL = "https://api.jiuliu.top"; //必改 网站后端API地址
axios.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})

app.provide("server_url", axios.defaults.baseURL);
app.mount('#jiuliu_out');


