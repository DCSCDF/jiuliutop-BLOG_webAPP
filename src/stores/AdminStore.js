import { defineStore } from 'pinia'

export const AdminStore = defineStore("admin", {
    state: () => {

        return {
            token: localStorage.getItem('admin_token') || '', // 初始化时读取
            id: 0,
            account: "",
        }
    },
    actions: {
        // 新增清除方法
        clearAuth() {
            this.$patch({
                id: 0,
                account: "",
                token: ""
            })
        }
    },
    persist: true,// 需要安装pinia持久化插件
    getters: {}
})
