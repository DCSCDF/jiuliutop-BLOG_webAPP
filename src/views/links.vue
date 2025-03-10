<template>
    <div class="flex flex-col min-h-screen">
        <!-- 加载动画 -->
        <LoadingSpinner v-if="isLoading" />
        <!-- 错误提示 -->
        <div v-else-if="isError" class="flex justify-center items-center min-h-screen">
            <n-result status="error" title="API加载失败" description="请稍后重试或联系管理员">
                <template #footer>
                    <n-button type="primary" @click="retryLoading" :theme-overrides="themeOverrides">重试</n-button>
                </template>
            </n-result>
        </div>
        <!-- 正常内容 -->
        <Header></Header>
        <main class="mb-auto">
            <section class="">
                <div class="container flex flex-col items-center px-4 py-12 mx-auto text-center">
                    <div
                        class="w-full lg:max-w-2xl max-w-lg px-4 py-3 bg-white/70 border dark:border-none border-gray-200 rounded-lg mt-10 dark:bg-gray-800/50">
                        <div>
                            <h1 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white">本站链接信息</h1>
                            <div class="mt-2 md:mx-10 mx-3 text-sm text-gray-600 dark:text-gray-300">
                                <div v-html="settingsData?.linktitle"></div>
                            </div>
                        </div>
                        <div>
                            <div class="mx-6 flex items-center mt-2 text-left text-gray-700 dark:text-gray-200">
                                <div v-html="settingsData?.linkcontent"></div>
                            </div>
                            <div class="inline-flex mt-6 mb-2 w-auto">
                                <!-- 自助友链申请按钮 -->
                                <!-- <a href=""
                                    class="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                    自助友链申请
                                </a> -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="dark:bg-gray-900 mb-44">
                <div class="container px-6 mx-auto">
                    <div class="flex flex-wrap justify-center flex-row gap-8 mx-auto">
                        <!-- 动态渲染链接列表 -->
                        <div v-for="link in links" :key="link.id">
                            <div
                                class="flex flex-row md:flex-col items-center justify-center mx-6 md:mx-1 w-96 md:w-auto max-w-sm">
                                <div class="w-28 rounded-l-lg md:w-64 h-20 md:h-40 bg-gray-300 bg-center bg-cover md:rounded-lg shadow-lg"
                                    :style="{ backgroundImage: `url(${link.img_url})` }" alt="项目图片"></div>
                                <div
                                    class="w-96 rounded-r-lg h-20 md:h-auto md:w-52 md:-mt-10 overflow-hidden bg-gray-100 md:rounded-lg shadow-lg dark:bg-gray-800">
                                    <h3
                                        class="py-2 text-nowrap m-1 text-sm md:text-lg font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                                        {{ link.title }}
                                    </h3>
                                    <div
                                        class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                        <span class="font-bold text-gray-800 dark:text-gray-200">{{ link.create_time ?
                                            formatDate(link.create_time) : '无日期' }}</span>
                                        <button type="button" @click="openLink(link.url)"
                                            class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                            打开网站
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';
// 引入加载动画模块
import LoadingSpinner from '../components/LoadingSpinner.vue';
//全局加载状态
const isLoading = ref(true)
const isError = ref(false) // 错误状态
// finally {
//         isLoading.value = false;
//     }



// 定义响应式数据
const settingsData = ref(null);
const links = ref([]);
const loading = ref(true);

// 获取设置信息
const fetchSettings = async () => {
    try {
        const id = 1; // 假设你要查询的 id 是 1
        const res = await axios.get(`/setting/${id}`);
        if (res.data.code === 200) {
            settingsData.value = res.data.data;
        } else {
            console.error('未找到对应数据');
        }
    } catch (error) {
        console.error('查询失败', error);
    } finally {
        isLoading.value = false;
    }
};

// 获取链接列表
const fetchLinks = async () => {
    try {
        const res = await axios.get("/links/search");
        if (res.data.code === 200) {
            links.value = res.data.data;
        } else {
            console.error('获取链接列表失败');
        }
    } catch (error) {
        console.error('获取链接列表失败', error);
    } finally {
        isLoading.value = false;
    }
};

// 打开链接
const openLink = (url) => {
    window.open(url, '_blank');
};

// 格式化时间戳为可读日期
const formatDate = (timestamp) => {
    // 确保时间戳是数字
    if (typeof timestamp !== 'number') {
        timestamp = Number(timestamp);
    }

    // 检查时间戳是否有效
    if (isNaN(timestamp) || timestamp <= 0) {
        return '无效日期';
    }

    // 如果时间戳是秒，转换为毫秒
    if (timestamp < 1000000000000) {
        timestamp *= 1000;
    }

    const date = new Date(timestamp);

    // 获取年、月、日
    const year = date.getFullYear(); // 年
    const month = date.getMonth() + 1; // 月（0-11，需要加1）
    const day = date.getDate(); // 日

    // 返回格式为 "YYYY-M-D"
    return `${year}-${month}-${day}`;
};
// 页面加载时调用 API
onMounted(async () => {
    await fetchSettings();
    await fetchLinks();
    loading.value = false;
});
</script>

<style scoped>
/* 自定义样式 */
</style>