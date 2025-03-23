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

                        <!-- 暂时隐藏模型 需要显示可以在class里面加上lg:block -->
                        <div class="lg:block w-full lg:w-md flex items-center justify-center mt-6 lg:mt-0 ">
                            <!-- <div ref="modelContainer" class="w-full h-96"></div> -->
                            <Weather></Weather>
                        </div>
                    </div>
                </div>


                <!-- card列表 -->
                <!-- <Carditem></Carditem> -->


                <!-- 热力图 启用去掉注释就行 -->
                <!-- <Heatmap></Heatmap> -->


                <n-layout class=" py-4 px-2 md:px-10" style="background-color: rgba(0,0,0,0);">
                    <!-- <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                        <h1 class=" text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">我的文章:</h1>
                    </div> -->
                    <div class="container max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                        <!-- 主内容区 -->
                        <div class="flex-1 space-y-6">
                            <!-- 如果文章数量为空，显示红色报错信息 -->
                            <div v-if="blogListInfo.length === 0"
                                class="text-gray-800 dark:text-gray-400 text-center text-2xl">
                                该分类没有找到相关文章！
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
                            <!-- 分页组件 -->
                            <div class="justify-center flex mt-10">
                                <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page"
                                    :page-count="pageInfo.pageCount" :theme-overrides="themeOverrides" />
                            </div>
                        </div>

                        <!-- 右侧面板 -->
                        <div class="w-full md:w-70">
                            <n-affix :trigger-top="isMobile ? Infinity : affixTriggerTop"
                                :style="isMobile ? { position: 'static' } : { top: `${headerOffset}px` }"
                                @change="handleAffixChange">
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
import Heatmap from "../components/Heatmap.vue"
import Carditem from "../components/Carditem.vue"
import Weather from "../components/Weather.vue"


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

// header响应逻辑
const headerOffset = ref(70) // 默认初始值
const affixTriggerTop = ref(70)
// 响应式移动端判断
const isMobile = ref(false)
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768 // Tailwind的md断点
}

// 生命周期管理
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})
const rightPanel = ref(null)
const affixStyle = ref({})
const originalWidth = ref(0)

// 处理affix状态变化
const handleAffixChange = (isFixed) => {
    // 移动端直接禁止固定
    if (isMobile.value) return false

    // 原有PC端逻辑
    if (isFixed) {
        originalWidth.value = rightPanel.value?.offsetWidth || 0
        affixStyle.value = {
            width: `${originalWidth.value}px`,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }
    } else {
        affixStyle.value = { width: '100%' }
    }
}
// 添加窗口resize监听器
onMounted(() => {
    window.addEventListener('resize', () => {
        if (originalWidth.value > 0) {
            affixStyle.value.width = `${originalWidth.value}px`
        }
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', () => { })
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

//  创建加载器
const loader = new GLTFLoader()

// 3D模型相关逻辑
const modelContainer = ref(null)
let scene, camera, renderer, controls, model
// 可调节参数

const CAMERA_FOV = 25 // 摄像机焦段
const INITIAL_ROTATION = Math.PI / 0.104 // 初始旋转角度（弧度制），可快速修改
const loading = ref(false); // 定义 loading 状态
const init3DModel = async () => {
    try {
        // 初始化场景
        scene = new THREE.Scene()

        // 创建摄像机（使用新的FOV参数）
        camera = new THREE.PerspectiveCamera(
            CAMERA_FOV, // 使用新定义的焦段
            modelContainer.value.offsetWidth / modelContainer.value.offsetHeight,
            0.1,
            1000
        )

        // 初始化渲染器
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        })
        renderer.setSize(modelContainer.value.offsetWidth, modelContainer.value.offsetHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        modelContainer.value.appendChild(renderer.domElement)

        // 灯光设置（优化光照强度）
        const ambientLight = new THREE.AmbientLight(0xffffff, 3.8) //环境光强度
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // 加载模型
        const gltf = await loader.loadAsync(`${basePath}models/3d.glb`)
        model = gltf.scene

        // 模型初始朝向调整
        model.rotation.y = INITIAL_ROTATION // 应用初始旋转

        // 自动调整模型位置和缩放
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3()).length()

        // 模型位置调整
        model.position.sub(center)
        scene.add(model)

        // 摄像机位置设置
        camera.position.set(
            size * 1.2, // X轴偏移
            size * 0.5,  // Y轴高度
            size * 1.5   // Z轴距离
        )
        camera.lookAt(0, size * 0.2, 0) // 看向场景中心偏上

        // 控制器设置（添加阻尼效果）
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false // 禁用所有缩放方式（包括滚轮和拖动）
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5
        controls.minDistance = size * 0.8
        controls.maxDistance = size * 3

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // 窗口大小响应
        window.addEventListener('resize', onWindowResize)
        loading.value = false

    } catch (error) {
        console.error('模型加载失败:', error)
        loading.value = false
    }
}
const onWindowResize = () => {
    camera.aspect = modelContainer.value.offsetWidth / modelContainer.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(modelContainer.value.offsetWidth, modelContainer.value.offsetHeight)
}


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
    try {
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
    if (modelContainer.value) {
        init3DModel();
    }
    loadBlogs(); // 初始化时加载博客数据
    loadBlogs_card();
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
    if (renderer) {
        renderer.dispose()
    }
})

const settingsData = ref(null);
import { fetchSettings } from '../utils/fetchSettings'; // 引入封装的 fetchSettings 函数

onMounted(async () => {
    settingsData.value = await fetchSettings();
});
/* console.log(blogListInfo) */

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
<style>
/* body {
    background-color: #fff1f1;
} */

/* CSS */
@media (max-width: 768px) {
    .n-affix--fixed {
        position: static !important;
        transform: none !important;
    }
}

/* 添加过渡效果 */
.n-affix {
    @media (width >=48rem

        /* 768px */
    ) {
        width: calc(var(--spacing) * 70) !important
            /* 17.5rem = 280px */
        ;
    }
}

.right-panel {
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 保持内容宽度一致 */
.affix-content {
    width: inherit !important;
}

/* 主页面添加过渡 */

.n-affix {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Header动画优化 */
header {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        height 0.2s ease-in-out;
    will-change: transform, height;
}

.fade {
    opacity: 0;
    transition: opacity 0.5s ease-out;
    /* 这里设置了0.5秒的过渡时间，以及ease-out的过渡速度曲线 */
}

.loading i {
    /* 这里可以添加你的加载动画样式 */
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #6c757d;
    margin: 4px;
    border-radius: 50%;
    opacity: 0.6;
    animation: loading 1s infinite;
}

@keyframes loading {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}

.loading {
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    animation: loading-ani1 4s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
}

.loading i {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 0.3rem;
    position: absolute;
}

.loading i:nth-child(1) {
    background: #ef5350;
    transform: translate(0, 0);
    animation: loading-ani2 4s ease-in-out infinite;
}

.loading i:nth-child(2) {
    background: #42a5f5;
    transform: rotate(90deg) translate(0, 0);
    animation: loading-ani3 6s ease-in-out infinite;
}

.loading i:nth-child(3) {
    background: #ffca28;
    transform: rotate(180deg) translate(0, 0);
    animation: loading-ani4 8s ease-in-out infinite;
}

.loading i:nth-child(4) {
    background: #5c6bc0;
    transform: rotate(270deg) translate(0, 0);
    animation: loading-ani5 10s ease-in-out infinite;
}

@keyframes loading-ani1 {
    25% {
        transform: rotate(135deg);
    }

    50% {
        transform: rotate(225deg);
    }

    75% {
        transform: rotate(315deg);
    }

    100% {
        transform: rotate(405deg);
    }
}

@keyframes loading-ani2 {

    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: translate(0, 0);
    }

    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: translate(0, 40px);
    }
}

@keyframes loading-ani3 {

    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(90deg) translate(0, 0);
    }

    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(90deg) translate(0, 40px);
    }
}

@keyframes loading-ani4 {

    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(180deg) translate(0, 0);
    }

    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(180deg) translate(0, 40px);
    }
}

@keyframes loading-ani5 {

    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(270deg) translate(0, 0);
    }

    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(270deg) translate(0, 40px);
    }
}

/* 添加过渡效果到 #loadingScreen */
#loadingScreen {
    opacity: 1;
    transition: opacity 1s ease-in-out;
    /* 这里定义了1秒的缓入缓出过渡效果 */
}

/* 添加一个控制透明度变化的类 */
#loadingScreen.fade {
    opacity: 0;
    transition: opacity 1s ease-in-out;
    /* 过渡效果 */
}

/* 可选：当loadingScreen隐藏时确保它占用的空间被释放 */
#loadingScreen.hidden {
    visibility: hidden;
    opacity: 0;
}

.custom-scroll::-webkit-scrollbar {
    height: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
    background-color: rgb(241 245 249);
    /* slate-100 */
    border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgb(203 213 225);
    /* slate-300 */
    border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background-color: rgb(148 163 184);
    /* slate-400 */
}

.n-card {
    background-color: color-mix(in oklab, var(--color-white) 50%, transparent) !important;
    margin-bottom: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 0.5rem !important;
    cursor: pointer !important;
}


.n-input {
    background-color: rgba(3, 7, 18, 0.05) !important;
}

.n-tag {
    background: rgba(3, 7, 18, 0.05) !important;
}

/* 深色模式下的样式 */
@media (prefers-color-scheme: dark) {

    .n-result .n-result-header .n-result-header__title {
        color: rgb(195, 204, 211) !important;
    }

    .n-result {
        color: rgb(145, 154, 161) !important;
    }

    .n-card {
        background-color: color-mix(in oklab, var(--color-white) 0%, transparent) !important;
        border-color: rgba(255, 255, 255, 0.131) !important;
        margin-bottom: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0.5rem !important;
        cursor: pointer !important;
    }

    .n-tag {
        background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
        color: rgb(145, 154, 161);
    }

    .n-input {
        background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;

    }

    .n-input__input-el {
        color: white !important;
    }

}
</style>

<style scoped>
@media (max-width: 768px) {
    .n-affix {
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
</style>
