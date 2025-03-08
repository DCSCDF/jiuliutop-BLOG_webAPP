<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto lg:mx-40">
            <section class="container px-4 mx-auto mt-10">
                <div>
                    <div class="flex items-center gap-x-3">
                        <div class="relative">
                            <img class="object-cover w-12 h-12 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                :src="getImageUrl('JiuLiu.jpg')" alt="">
                            <span
                                class="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                        </div>
                        <h2 class="text-lg font-medium text-gray-800 dark:text-white">{{ item.account }}</h2>
                        <span
                            class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                            {{ item.email }}
                        </span>
                    </div>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">在此管理你的账户更改设置。</p>
                </div>
                <div class="mt-6 menus md:flex md:items-center md:justify-between">
                    <div class="flex flex-wrap rounded-lg dark:bg-gray-900 dark:border-gray-700">
                        <n-button v-for="(menu, index) in menus" :key="index" @click="topage(menu.href)" tertiary
                            style="margin: 0px 10px;">
                            {{ menu.name }}
                        </n-button>
                    </div>
                </div>
                <div
                    class="flex bg-white flex-row justify-center items-center my-6 border border-gray-300 rounded-lg dark:border-gray-700">
                    <!-- 新增内容容器 -->

                    <!-- 用户相关的内容 -->
                    <router-view></router-view>
                </div>
            </section>
        </main>
        <Footer></Footer>
    </div>

</template>

<script setup>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import { AdminStore } from '../../stores/AdminStore';
import { ref, reactive, onMounted, inject } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useMessage, useDialog, } from "naive-ui";
import axios from 'axios'; // 导入 axios

const message = useMessage();
const router = useRouter();
const route = useRoute();
const dialog = useDialog();
const adminStore = ref(AdminStore());

const menus = [
    { name: "文章管理", href: "/dashboard/article" },
    { name: "分类管理", href: "/dashboard/category" },
    { name: "友链管理", href: "/dashboard/link" },
    { name: "登出", href: "/adminlogin" } // 修改登出路由为 "/login"
];


const topage = (href) => {
    try {
        if (!href) {
            console.error('Invalid location: href is undefined');
            return;
        }

        if (href === "/adminlogin") {
            // 新增登出二次确认逻辑
            dialog.warning({
                title: '确认登出',
                content: '你确定要登出吗？',
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                    adminStore.value.clearAuth();
                    localStorage.removeItem('admin_token');
                    router.push("/adminlogin");
                },
                onNegativeClick: () => {
                    // 用户取消登出，不做任何操作
                }
            })
        } else {
            router.push(href);
        }
    } catch (error) {
        console.error('Error during navigation:', error);
    }
};


const loading = ref(true);
const error = ref(null);
// 在 setup 中定义 item
const item = ref({ account: 'null未获取', img_url: 'https://cdn.pixabay.com/photo/2024/07/20/17/12/warning-8908707_960_720.png', email: 'null未获取' });

// 修改 onMounted 逻辑
onMounted(async () => {
    try {
        const response = await axios.get('/admin/public-info');
        if (response.data.code === 200) {
            item.value = response.data.data[0]; // 绑定到 item
        } else {
            error.value = `请求异常：${response.data.msg}`;
            message.error("网络请求异常1");
        }
    } catch (err) {
        console.log()
        error.value = '网络请求失败';
        message.error("网络请求异常2");
    } finally {
        loading.value = false;
    }
});

// 获取图片 URL
const getImageUrl = (name) => {
    return new URL(`../../assets/img/${name}`, import.meta.url).href;
};
</script>

<style scoped>
.menus {
    display: flex;
    flex-wrap: wrap;
}

.menus>div {
    display: flex;
    flex-wrap: wrap;
}

.menus>div>div {
    flex: 1 1 auto;
}

.menus>div>div>button {
    width: auto;
    text-align: left;
    margin-right: 10px;
}

.menus>div>div:last-child>button {
    margin-right: 0;
}
</style>