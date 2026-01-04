<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto">

            <section
                class="mt-10 mx-4 xl:mx-60 lg:mx-40 md:mx-15 border border-gray-200 dark:border-none rounded-2xl md:px-5 px-1 py-10 bg-white/80 dark:bg-gray-800/70">
                <div class="mx-auto">
                    <div class="flex  justify-center">
                        <div class="flex flex-col">
                            <h1
                                class="flex justify-center text-2xl mx-2 mt-10 font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                                留言
                            </h1>
                            <!-- <div class="mt-2 mx-2 flex justify-center">
                                <span class="inline-block w-30 h-1 bg-blue-500 rounded-full"></span>
                                <span class="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                                <span class="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
                            </div> -->
                            <p class="flex justify-center mt-2 mx-2 text-sm text-gray-700 dark:text-gray-300">
                                良言一句三冬暖，恶语伤人六月寒。</p>
                        </div>
                    </div>
                    <div class="my-10 border-b dark:border-gray-700 border-gray-200"></div>
                    <div class="md:mx-10 mx-3 mt-10">
                        <div id="tcomment"></div>
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
import themeOverrides from '../themeOverrides'; //引入自定义主题
import { ref, onMounted, onUnmounted, reactive, watch, computed } from 'vue'
import { commentConfig } from "../api.js"


onMounted(async () => {
    // 动态加载twikoo CDN
    const loadTwikoo = () => new Promise((resolve, reject) => {
        if (window.twikoo) return resolve();

        const script = document.createElement('script');
        script.src = commentConfig.scriptUrl;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    // 初始化评论
    const init = async () => {
        try {
            await loadTwikoo();
            twikoo.init({
                envId: commentConfig.apiEndpoint,
                el: `#tcomment`,
                path: "comments"
            });
        } catch (err) {
            console.error('评论初始化失败:', err);
        }
    };

    init();
});



</script>
<style scoped></style>
