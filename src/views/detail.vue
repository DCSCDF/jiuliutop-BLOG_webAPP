<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto flex justify-center"> <!-- 添加 flex 布局实现居中 -->
            <section
                class="max-w-4xl mt-10 mx-4 border border-gray-200 dark:border-none rounded-2xl lg:px-10 md:px-5 px-1 py-10 bg-white/80 dark:bg-gray-800/70">
                <div class="mx-auto">
                    <div class="lg:flex lg:items-center">
                        <div class="w-full">
                            <!-- 保持原有内容结构不变 -->
                            <div>
                                <h1
                                    class="text-2xl text-center font-semibold text-gray-800 mx-4 mt-10 capitalize lg:text-3xl dark:text-white">
                                    {{ blogInfo.title }}
                                </h1>
                                <div class="mt-2 justify-center flex">
                                    <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                                    <span class="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                                    <span class="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
                                </div>
                            </div>
                            <div class="md:mx-10 mx-3 mt-10">
                                <article
                                    class="prose prose-leading-6 dark:text-gray-400 prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600"
                                    v-html="blogInfo.content"></article>
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
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { NForm, } from 'naive-ui';
import themeOverrides from '../themeOverrides'; //引入自定义主题
import { ref, reactive, onMounted, inject } from "vue";
import { AdminStore } from '../stores/AdminStore';
import { useRouter, useRoute } from 'vue-router'; // 添加路由hook
import axios from "axios";



const route = useRoute()
const router = useRouter()
/* const axios = inject("axios") */
const blogInfo = ref({})

onMounted(() => {
    loadBlog()
    twikoo.init({
        envId: "https://discuss.jiuliu.top/",
        el: "#tcomment",
        region: "ap-shanghai",
        path: new URLSearchParams(window.location.search).get('id') // 提取?id=后的参数值[3,5](@ref)
    });
})
const loadBlog = async () => {
    try {
        let res = await axios.get("/blog/detail?id=" + route.query.id);
        /* console.log("API Response:", res.data); */

        if (res.data && res.data.data) {
            blogInfo.value = res.data.data;
        } else {
            console.error("No blog data found in response:", res.data);
            blogInfo.value = { title: "未找到博客内容", content: "请检查博客 ID 是否正确" };
        }
    } catch (error) {
        console.error("Failed to load blog:", error);
        blogInfo.value = { title: "加载失败", content: "无法加载博客内容，请稍后重试" };
    }
};
</script>
<style>
.prose {
    max-width: none !important;
}

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
}
</style>
