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

export const useCategoryStore = defineStore('category', {
    state: () => ({
        selectedCategoryId: 0, // 默认值
    }),
    actions: {
        // 相当于 Vuex 的 mutations
        setSelectedCategoryId(id) {
            this.selectedCategoryId = id;
        },
        // 相当于 Vuex 的 actions
        updateSelectedCategoryId(id) {
            this.setSelectedCategoryId(id);
        },
    },
});