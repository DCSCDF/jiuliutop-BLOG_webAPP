<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto flex justify-center"> <!-- 添加 flex 布局实现居中 -->
            <section
                class="mt-10 mx-4 xl:mx-60 lg:mx-40 md:mx-15 border border-gray-200 dark:border-none rounded-2xl md:px-5 px-1 py-10 bg-white/80 dark:bg-gray-800/70">
                <div class="mx-auto">
                    <div class="lg:flex lg:items-center">
                        <div class="w-full">
                            <!-- 保持原有内容结构不变 -->
                            <div>
                                <h1
                                    class="text-2xl mx-2 mt-10 font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                                    {{ blogInfo.title }}
                                </h1>
                                <div class="mt-2 mx-2 flex">
                                    <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                                    <span class="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                                    <span class="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
                                </div>
                                <!-- <div class="mt-8 rounded-xl border dark:border-gray-700 border-gray-200">
                                    <div class="flex mx-4 mt-4 items-center gap-x-3">
                                        <div class="relative">
                                            <img class="object-cover w-12 h-12 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                                :src="getImageUrl('JiuLiu.jpg')" alt="">
                                            <span
                                                class="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                                        </div>
                                        <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                                            JiuLiu
                                        </h2>
                                        <span
                                            class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                                            3209174273@qq.com
                                        </span>
                                    </div>
                                    <p class="mx-4 mb-4 mt-2 text-sm text-gray-500 dark:text-gray-300">
                                        转载请标明出处，谢谢。
                                    </p>
                                </div> -->
                                <div>
                                    <p class="mt-2 mx-2 text-sm text-gray-500 dark:text-gray-300">
                                        发布日期: {{ blogInfo.create_time }}</p>
                                </div>
                            </div>
                            <div class="mt-5 border-b dark:border-gray-700 border-gray-200"></div>
                            <div class="mx-3 mt-10">
                                <!-- 加载动画 -->
                                <div v-if="loading" class="flex justify-center items-center">
                                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                                <!-- 加载失败提示 -->
                                <div v-else-if="loadFailed" class="text-center text-red-500">
                                    加载失败，请稍后重试。
                                </div>
                                <!-- 内容区域 -->
                                <article v-else class="prose prose-sm md:prose
                            dark:prose-h1:text-gray-200
                            dark:prose-h2:text-gray-200
                            dark:prose-h3:text-gray-200
                            dark:prose-h4:text-gray-200
                            dark:prose-h5:text-gray-200
                            dark:prose-h6:text-gray-200
                            dark:text-gray-200
                            dark:prose-code:text-gray-200
                            dark:prose-strong:text-gray-200" v-html="blogInfo.content"
                                    style="max-width: none; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; width: 100%;">
                                </article>
                            </div>
                            <div class="mt-16 border-b dark:border-gray-700 border-gray-200"></div>
                            <div class="md:mx-10 mx-3 mt-10">
                                <div id="tcomment"></div>
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

// 获取图片 URL
const getImageUrl = (name) => {
    return new URL(`../assets/img/${name}`, import.meta.url).href;
};

const route = useRoute();
const blogInfo = ref({});
const loading = ref(true); // 加载状态
const loadFailed = ref(false); // 加载失败状态

onMounted(() => {
    loadBlog();
    twikoo.init({
        envId: "https://discuss.jiuliu.top/",
        el: "#tcomment",
        region: "ap-shanghai",
        path: new URLSearchParams(window.location.search).get("id"), // 提取?id=后的参数值
    });
});

const loadBlog = async () => {
    const router = useRouter();

    try {
        let res = await axios.get("/blog/detail?id=" + route.query.id);
        /* console.log("API Response:", res.data); */

        if (res.data && res.data.data) {
            // 解析时间戳
            const createTime = new Date(res.data.data.create_time);
            const formattedTime = createTime.toLocaleString(); // 可以根据需要调整时间格式

            // 将解析后的时间添加到 blogInfo 对象中
            blogInfo.value = {
                ...res.data.data,
                create_time: formattedTime
            };
        } else {
            console.error("No blog data found in response:", res.data);
            blogInfo.value = { title: "未找到博客内容", content: "请检查博客 ID 是否正确" };
            router.push("/"); // 跳转到主页
        }
    } catch (error) {
        console.error("Failed to load blog:", error);
        blogInfo.value = { title: "加载失败", content: "未找到博客内容，请稍后重试" };
        loadFailed.value = true; // 标记加载失败
    } finally {
        loading.value = false; // 无论成功或失败，结束加载状态
    }
};
</script>

<style>
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5 {
    text-decoration: none !important;
}

/* 覆盖所有可能的父容器对图片的影响 */
.prose :where(p, div, section, article)>img {
    margin-left: 0 !important;
    margin-right: 0 !important;
    float: none !important;
    display: inline-block !important;
    max-width: none !important;
}
</style>