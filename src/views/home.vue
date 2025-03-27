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
        <template v-else>
            <Header></Header>
            <main class="mb-auto">
                <div class="container px-6 pt-10 py-2 mx-auto lg:w-6xl">
                    <div class="items-center lg:flex">
                        <div class="w-full mt-10">
                            <div class="lg:max-w-xl">
                                <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-5xl">Wellcome！
                                    <br>
                                    欢迎来到 {{ settingsData?.webname }}
                                </h1>
                                <p class="mt-3 text-wrap lg:mr-10 text-gray-600 dark:text-gray-400">
                                    {{ settingsData?.webcontent }}
                                </p>
                                <div class="my-6">
                                    <!-- <n-button color="#6b7281" style="width: 100px;">关于我</n-button> -->
                                </div>
                            </div>
                            <!-- 技术栈显示 -->
                            <Technologystack></Technologystack>
                        </div>

                        <!-- 天气组件 -->
                        <div class="lg:block w-full lg:w-md flex items-center justify-center mt-6 lg:mt-0 ">
                            <Weather></Weather>
                        </div>
                    </div>
                </div>

                <n-layout class=" py-4 px-2 md:px-10" style="background-color: rgba(0,0,0,0);">
                    <div class="container max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                        <!-- 主内容区 -->
                        <div class="flex-1 space-y-6">
                            <!-- 加载状态 -->
                            <LoadingSpinner v-if="isLoadingArticles" />

                            <!-- 文章列表 -->
                            <template v-else>
                                <!-- 如果文章数量为空，显示提示信息 -->
                                <div v-if="blogListInfo.length === 0"
                                    class="text-gray-800 dark:text-gray-400 text-center text-2xl">
                                    没有找到相关文章！
                                </div>
                                <!-- 如果文章数量不为空，显示文章列表 -->
                                <template v-else>


                                    <n-card ref="card" v-for="(blog, index) in blogListInfo" :key="index"
                                        :content-style="{ padding: 0 }" @click="toDetail(blog)">
                                        <div class="p-5 flex flex-row ">
                                            <!-- 图片区域 -->
                                            <div class="md:w-50 w-30 h-36 flex-shrink-0 mr-3">
                                                <img class="object-cover w-full h-full rounded-md" :src="blog.imageUrl"
                                                    alt="文章封面" />
                                            </div>
                                            <!-- 内容区域 -->
                                            <div class="flex-1 flex flex-col z-20 justify-between">
                                                <!-- 顶部内容 -->
                                                <div>
                                                    <h1
                                                        class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 line-clamp-1">
                                                        {{ blog.title }}
                                                    </h1>
                                                    <p class="text-gray-500 dark:text-gray-500 line-clamp-3">
                                                        {{ blog.content }}
                                                    </p>
                                                </div>
                                                <!-- 底部信息 -->
                                                <div class="flex pt-1">
                                                    <n-tag :bordered="false">
                                                        {{ blog.create_time }}
                                                    </n-tag>
                                                    <div class="ml-3">
                                                        <n-tag :bordered="false">
                                                            {{ blog.commentCount }}条评论
                                                        </n-tag>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </n-card>


                                </template>
                            </template>
                            <!-- 分页组件 -->
                            <!-- 分页组件 -->
                            <div class="justify-center flex mt-10">
                                <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page"
                                    :page-count="pageInfo.pageCount" :theme-overrides="{
                                        itemColor: 'var(--n-item-color)',
                                        itemColorHover: 'var(--n-item-color-hover)',
                                        itemColorPressed: 'var(--n-item-color-pressed)',
                                        itemBorder: '1px solid var(--n-item-border-color)',
                                        itemBorderHover: '1px solid var(--n-item-border-color-hover)',
                                        itemBorderActive: '1px solid var(--n-item-border-color-active)',
                                        itemTextColor: 'var(--n-item-text-color)',
                                        itemTextColorHover: 'var(--n-item-text-color-hover)',
                                        itemTextColorPressed: 'var(--n-item-text-color-pressed)',
                                        itemTextColorActive: 'var(--n-item-text-color-active)',
                                        itemBorderDisabled: '1px solid var(--n-item-border-color-disabled)',
                                        itemColorDisabled: 'var(--n-item-color-disabled)',
                                        itemTextColorDisabled: 'var(--n-item-text-color-disabled)',
                                        buttonColor: 'var(--n-button-color)',
                                        buttonColorHover: 'var(--n-button-color-hover)',
                                        buttonIconColor: 'var(--n-button-icon-color)',
                                        buttonIconColorHover: 'var(--n-button-icon-color-hover)'
                                    }" />
                            </div>
                        </div>

                        <!-- 右侧面板 -->
                        <div class="w-full md:w-70">
                            <n-affix :trigger-top="affixTriggerTop"
                                :style="isMobile ? { position: 'static' } : { top: `${headerOffset}px` }">
                                <div ref="rightPanel" class="max-h-[calc(100vh-140px)]" :style="affixStyle">
                                    <About></About>
                                    <n-card :content-style="{ padding: 0 }" style="background-color: color-mix(in oklab, var(--color-white) 60%, transparent); 
                                        border-radius: 0.5rem;">
                                        <div class="p-5">
                                            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">搜索文章
                                            </h3>
                                            <div class="space-y-3">
                                                <div class="flex flex-col mb-1 gap-2">
                                                    <div class="flex flex-row">
                                                        <n-input :bordered="false" :theme-overrides="themeOverrides"
                                                            v-model:value="pageInfo.keyword" placeholder="输入关键词"
                                                            @keyup.enter="loadBlogs(1)">
                                                        </n-input>
                                                    </div>
                                                    <span
                                                        class="text-left text-gray-600 dark:text-gray-400 line-clamp-3">
                                                        在这里检索所有文章
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </n-card>
                                </div>
                            </n-affix>
                        </div>
                    </div>
                </n-layout>
            </main>
            <Footer></Footer>
        </template>
    </div>
</template>

<script setup>
//引入：
import Technologystack from "../components/Technologystack.vue"
import About from "../components/AboutMe.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Weather from "../components/Weather.vue"

import { ref, onMounted, onUnmounted, reactive, watch, computed } from 'vue'
import themeOverrides from '../themeOverrides'; //引入自定义主题
import axios from 'axios';
import { useRouter } from 'vue-router'; // 添加路由hook
import { useCategoryStore } from '../stores/AdminStore.js'; // 引入 Pinia Store

// 引入加载动画模块
import LoadingSpinner from '../components/LoadingSpinner.vue';

//全局加载状态
const isLoading = ref(true)
const isError = ref(false) // 错误状态
const isLoadingArticles = ref(false) // 文章加载状态
const rightPanel = ref(null)
const affixStyle = ref({})
const originalWidth = ref(0)
// header响应逻辑
const headerOffset = ref(70) // 默认初始值
const affixTriggerTop = ref(70)
// 响应式移动端判断
const isMobile = ref(false)


// 响应式移动端判断
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768 // Tailwind的md断点
}

// 添加窗口resize监听器
const handleResize = () => {
    checkMobile()
    // 如果当前是固定状态且不是移动端，更新宽度
    if (!isMobile.value && originalWidth.value > 0) {
        affixStyle.value.width = `${rightPanel.value?.offsetWidth || originalWidth.value}px`
    }
}

// 生命周期管理
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})




// 使用 useCategoryStore 获取 Pinia Store
const categoryStore = useCategoryStore();

// 使用 computed 获取选中的分类 ID
const selectedCategoryId = computed(() => categoryStore.selectedCategoryId);

const router = useRouter(); // 获取路由实例
const toDetail = (blog) => {
    router.push({ path: "/detail", query: { id: blog.id } })
}

//  获取基础路径（兼容开发和生产环境）
const basePath = import.meta.env.BASE_URL
// 新增防抖相关变量
let timeout = null

const blogListInfo = ref([])
const blogListInfo_card = ref([])
//博客列表展示逻辑
const pageInfo_card = reactive({
    pageSize: 10,
    count: 0,
    categoryId: 0,
})
const pageInfo = reactive({
    page: 1,
    pageSize: 6,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId: 0,
})
const loadBlogs_card = async () => {
    try {
        // 确保 pageInfo_card 已经定义
        if (!pageInfo_card) {
            throw new Error("pageInfo_card is not defined");
        }

        // 发起请求获取博客数据
        let res = await axios.get(`/blog/search`, {
            params: {
                pageSize: pageInfo_card.pageSize,
            },
        });

        // 处理响应数据
        let temp_rows = res.data.data.rows;
        pageInfo_card.count = res.data.data.count;

        // 确保 blogListInfo_card 和 cards 已经定义
        if (!blogListInfo_card || !cards) {
            throw new Error("blogListInfo_card or cards is not defined");
        }

        // 处理图片路径并格式化日期
        const processedRows = temp_rows.map((row) => ({
            ...row,
            title: row.title,
            content: row.content + " ...",
            imageUrl: `${row.img_url}`,
        }));
        blogListInfo_card.value = processedRows.map((row) => ({
            id: row.id,
            title: row.title,
            content: row.content,
            imageUrl: row.imageUrl,
        }));
    } catch (error) {
        /* console.error("加载博客数据失败:", error); */
        // 可以在这里添加用户提示或其他错误处理逻辑
    } finally {
        isLoading.value = false;
    }
};
// loadBlogs 函数
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    isLoadingArticles.value = true;
    try {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // 获取博客列表数据
        const res = await axios.get(`/blog/search`, {
            params: {
                page: pageInfo.page,
                pageSize: pageInfo.pageSize,
                keyword: pageInfo.keyword,
                categoryId: selectedCategoryId.value,
            },
        });

        // 处理基础数据
        let temp_rows = res.data.data.rows;
        pageInfo.count = res.data.data.count;
        pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize);

        // 格式化数据并添加imageUrl
        const processedBlogs = temp_rows.map((row) => ({
            ...row,
            content: row.content + " ...",
            create_time: formatDate(row.create_time),
            imageUrl: `${row.img_url}`,
            commentCount: 0 // 初始化评论数
        }));

        // 获取评论数
        await fetchCommentsCount(processedBlogs);

        // 更新响应式数据
        blogListInfo.value = processedBlogs;
    } catch (error) {
        console.error("加载博客失败:", error);
        isError.value = true;
    } finally {
        isLoadingArticles.value = false;
        isLoading.value = false;
    }
};

// 新增日期格式化函数
const formatDate = (dateString) => {
    const d = new Date(dateString)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
// 监听搜索关键词变化
watch(() => pageInfo.keyword, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        // 清除之前的定时器
        clearTimeout(timeout)
        // 设置新的定时器
        timeout = setTimeout(() => {
            // 搜索时重置到第一页
            pageInfo.page = 1
            loadBlogs()
        }, 300)
    }
})
watch(selectedCategoryId, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        loadBlogs(1); // 重新加载博客列表
    }
});
// 生命周期钩子
onMounted(() => {
    clearTimeout(timeout);
    loadBlogs(); // 初始化时加载博客数据
    loadBlogs_card();
});

const settingsData = ref(null);
import { fetchSettings } from '../utils/fetchSettings'; // 引入封装的 fetchSettings 函数

onMounted(async () => {
    settingsData.value = await fetchSettings();
});

//配置
import {
    setupCommentSystem as initComment, // 别名保持语义
    commentConfig
} from "../api.js";

const fetchCommentsCount = async (blogs) => {
    try {
        // 确保初始化完成
        await initComment('temp-container', 'preload');

        const counts = await window.twikoo.getCommentsCount({
            envId: commentConfig.apiEndpoint,
            urls: blogs.map(b => b.id.toString())
        });

        blogs.forEach((blog, index) => {
            blog.commentCount = counts[index]?.count || 0;
        });
    } catch (err) {
        console.warn('评论统计获取降级:', err);
        blogs.forEach(blog => blog.commentCount = 0);
    }
};


// 重试加载
const retryLoading = () => {
    isError.value = false;
    isLoading.value = true;
    loadBlogs();
};
</script>

<style scoped>
.n-affix {
    transition: all 0.3s ease;
}

/* 确保在移动端时affix完全禁用 */
@media (max-width: 768px) {
    .n-affix :deep(.n-affix--fixed) {
        position: static !important;
        transform: none !important;
    }

    .isFixed {
        position: static !important;
    }
}

/* 卡片局部样式 */
.n-card {
    min-width: 200px;
    max-width: 360px;
    width: 30%;
    backface-visibility: hidden;
}


/* 按钮悬停动画 */
button:hover .n-icon {
    transform: scale(1.1);
    transition: transform 0.2s ease;
}

/* 新增3D容器样式 */
.model-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: transparent;
}

canvas {
    outline: none;
    width: 100% !important;
    height: 100% !important;
}

/* 强制3D容器尺寸 */
.model-container {
    width: 100% !important;
    height: 384px !important;
    /* h-96 = 24rem = 384px */
    position: relative;

}

canvas {
    touch-action: none;
    /* 防止移动端手势冲突 */
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
}

&:hover {
    background-color: #9c9c9c;
    /* 淡灰色 */
}

:deep(.n-card) {
    width: 100% !important;
}

.n-card {
    background-color: color-mix(in oklab, var(--color-white) 50%, transparent) !important;
    margin-bottom: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 0.5rem !important;
    cursor: pointer !important;
}

@media (prefers-color-scheme: dark) {

    .n-card {
        background-color: color-mix(in oklab, var(--color-white) 0%, transparent) !important;
        border-color: rgba(255, 255, 255, 0.131) !important;
        margin-bottom: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0.5rem !important;
        cursor: pointer !important;
    }
}
</style>
