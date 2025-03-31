<template>
    <header ref="header"
        class="sticky top-0 z-30 w-full backdrop-blur-xl flex-none transition-transform duration-500 border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/60 dark:bg-gray-900/60">
        <div id="errorPopupContainer"></div>
        <div class="lg:w-6xl container px-6 py-2 mx-auto">
            <div class="flex items-center justify-between">
                <h1 class="px-3 py-2 text-xl text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:cursor-pointer"
                    @click="$router.push('/')">
                    {{ settingsData?.webname }}
                </h1>
                <div class="relative bg-transparent w-auto opacity-100 translate-x-0 flex items-center">


                    <!-- 桌面端导航 -->
                    <div class="hidden md:flex flex-row items-center z-50">
                        <n-button v-for="(menu, index) in menus" :key="index" @click="handleMenuClick(menu.href)"
                            quaternary style="margin: 0px 4px;" :theme-overrides="themeOverrides">
                            {{ menu.name }}
                        </n-button>
                        <n-popselect v-if="isHomePage" @update:value="searchByCategory" v-model:value="selectedCategory"
                            :virtual-scroll="true" :options="categoryOptions" trigger="click"
                            :theme-overrides="themeOverrides">
                            <div class="text-gray-700 dark:text-gray-300 mx-2 text-nowrap flex items-center"
                                style="cursor: pointer; margin-top: 2px;">
                                分类列表
                                <span class="text-xs text-gray-400 ml-1">
                                    {{ CategoryName }}
                                </span>
                            </div>
                        </n-popselect>
                        <!-- 分割 -->
                        <!-- <div class="h-4 mr-4 w-[1px] bg-gray-300 dark:bg-slate-800"></div> -->

                        <div class="bg-gray-900/5 flex flex-row dark:bg-white/5 rounded-md">
                            <n-button v-for="(menu, index) in custommenus" :key="index"
                                @click="handleMenuClick(menu.href)" quaternary>
                                {{ menu.name }}
                            </n-button>
                        </div>
                    </div>
                    <Darkmode></Darkmode>

                    <!-- 移动端展开式菜单 -->
                    <div class="md:hidden flex items-center">
                        <n-dropdown trigger="click" style="width: 200px;" :options="dropdownOptions"
                            @select="handleMenuClick">
                            <n-button quaternary>
                                <template #icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </template>
                            </n-button>
                        </n-dropdown>
                    </div>


                </div>
            </div>
        </div>
    </header>

    <!-- 背景图片 -->
    <div ref="backgroundImage" class=" will-change-auto fixed -z-10 top-0 h-full inset-x-0 flex justify-center">
        <!-- 添加定位层 -->
        <div class="relative w-full h-full">
            <css-doodle style="filter: blur(90px);">
                :doodle {
                @grid: 3x2 / 100%;
                height: 60%;
                overflow: visible;
                will-change: transform, opacity;
                }

                content-box,
                linear-gradient(black, black);
                mask:
                linear-gradient(
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,0) 100%
                )
                content-box,
                linear-gradient(black, black);

                /* 色彩 */
                background: hsla(
                @pick(200, 169, 342), /* 蓝色、绿色和粉色的色相值 */
                70%, /* 固定饱和度 */
                50%, /* 固定亮度 */
                0.11 /* 固定透明度 */
                );

                /* 动态动画 */
                animation: float @r(8, 15)s infinite @r(-10, 0)s ease-in-out;
                @keyframes float { 50% {
                transform:
                translate3d(@rn(-300%, 300%), @rn(-60%, 60%), 0)
                scale(@rn(0.5, 2))
                rotate(@rn(-30deg, 30deg));
                opacity: @rand(0.5, 1);
                } }
            </css-doodle>
        </div>
    </div>

</template>


<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed, watch, watchEffect } from 'vue';
import themeOverrides from '../themeOverrides'; // 引入自定义主题
import axios from 'axios';
import { useCategoryStore } from '../stores/AdminStore';
import { useRoute, useRouter } from 'vue-router';
import 'css-doodle'

import Darkmode from './Darkmode.vue';
// 添加背景图片引用
const backgroundImage = ref(null);
const settingsData = ref(null);
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore(); // 使用 Pinia Store
const header = ref(null);
const selectedCategory = ref(categoryStore.selectedCategoryId); // 从 Pinia Store 获取初始值
const categoryOptions = ref([]);
const lastScrollPosition = ref(0);

// 菜单数据
const menus = reactive([
    { name: "主页", href: "/" },
    { name: "友情链接", href: "/links" },
    { name: "登陆", href: "/adminlogin" },
    { name: "留言", href: "/guestbook" },
]);
// 自定义链接🔗
const custommenus = reactive([
    { name: "网盘", href: "https://pan.jiuliu.top/" },
    { name: "开往", href: "https://www.travellings.cn/go.html" },
]);

// 展开式菜单选项
const dropdownOptions = computed(() => {
    const mainMenuItems = menus.map(menu => ({
        label: menu.name,
        key: menu.href,
        type: 'item'
    }));

    const customMenuItems = custommenus.map(menu => ({
        label: menu.name,
        key: menu.href,
        type: 'item'
    }));

    // 添加分隔线
    const divider = {
        type: 'divider',
        key: 'divider'
    };

    return [
        ...mainMenuItems,
        divider,
        ...customMenuItems
    ];
});
// 统一处理菜单点击
const handleMenuClick = (key) => {
    if (key.startsWith('http')) {
        // 外部链接在新标签页打开
        window.open(key, '_blank');
    } else {
        // 内部路由导航
        router.push(key);
    }
};

// 计算当前是否在首页
const isHomePage = computed(() => {
    return route.path === '/';
});

// 处理滚动事件
const handleScroll = () => {
    if (!header.value) return;

    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) return;

    // 头部隐藏逻辑
    if (currentScrollPosition > 200) {
        if (currentScrollPosition > lastScrollPosition.value) {
            header.value.style.transform = "translateY(-100%)";
        } else {
            header.value.style.transform = "translateY(0)";
        }
    } else {
        header.value.style.transform = "translateY(0)";
    }

    lastScrollPosition.value = currentScrollPosition;



    // 视差效果调整
    if (backgroundImage.value) {
        // 修改视差系数为负值实现上移
        const parallaxFactor = 0.3;
        const parallaxY = currentScrollPosition * parallaxFactor * -1; // 乘以-1实现反向移动

        // 应用变换（移除透明度控制）
        backgroundImage.value.style.transform = `translateY(${parallaxY}px)`;
    }
    // // 视差效果调整
    // if (backgroundImage.value) {
    //     // 使用更小的视差系数（0.3-0.5之间效果最佳）
    //     const parallaxFactor = 0.4;
    //     const parallaxY = currentScrollPosition * parallaxFactor;

    //     // 透明度计算（滚动超过200px开始淡出）
    //     const fadeStart = 200;
    //     const fadeLength = 500;
    //     const opacity = currentScrollPosition < fadeStart
    //         ? 1
    //         : 1 - Math.min((currentScrollPosition - fadeStart) / fadeLength, 1);

    //     // 应用变换
    //     backgroundImage.value.style.transform = `translateY(${parallaxY}px)`;
    //     backgroundImage.value.style.opacity = opacity;
    // }
};

// 移除滚动事件监听
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

// 计算分类名称
const CategoryName = computed(() => {
    if (selectedCategory.value === 0) {
        return "";
    }
    const selectedOption = categoryOptions.value.find(
        (option) => option.value === selectedCategory.value
    );
    return selectedOption ? selectedOption.label : "";
});

// 加载分类数据
const loadCategorys = async () => {
    try {
        const res = await axios.get("/category/list");
        if (res.data && res.data.data) {
            categoryOptions.value = [
                { label: "所有", value: 0 },
                ...res.data.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                })),
            ];
        } else {
            console.error("Unexpected API response:", res.data);
        }
    } catch (error) {
        console.error("Failed to load categories:", error);
    }
};

// 分类选择事件
const searchByCategory = (value) => {
    selectedCategory.value = value;
    categoryStore.updateSelectedCategoryId(value); // 调用 Pinia Store 的 action
};

// 初始化
onMounted(async () => {
    window.addEventListener("scroll", handleScroll);
    loadCategorys();

    try {
        const id = 1;
        const res = await axios.get(`/setting/${id}`);
        if (res.data.code === 200) {
            settingsData.value = res.data.data;
        } else {
            console.error('未找到对应数据');
        }
    } catch (error) {
        console.error('查询失败', error);
    } finally {
        loading.value = false;
    }
});

// 获取图片 URL
// const getImageUrl = (name) => {
//     return new URL(`../assets/img/${name}`, import.meta.url).href;
// };
</script>

<style scoped>
header {
    transition: transform 0.5s ease-in-out;
}

.dark .n-button {
    background-color: color-mix(in oklab, var(--color-white) 0%, transparent) !important;
    color: #E5E7EB !important;
}

.dark .n-button:hover {
    background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
}


.absolute {
    /* 添加 will-change 优化动画性能 */
    will-change: transform, opacity;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.css-doodle-container {
    will-change: transform, opacity;
}
</style>