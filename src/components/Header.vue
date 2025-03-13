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
                    <div class="hidden md:flex flex-row items-center mx-8 z-50">
                        <n-button v-for="(menu, index) in menus" :key="index" @click="topage(menu.href)" quaternary
                            style="margin: 0px 4px;" :theme-overrides="themeOverrides">
                            {{ menu.name }}
                        </n-button>
                        <n-popselect v-if="isHomePage" @update:value="searchByCategory" v-model:value="selectedCategory"
                            :virtual-scroll="true" :options="categoryOptions" trigger="click"
                            :theme-overrides="themeOverrides">
                            <div class="text-gray-700 dark:text-gray-300 mx-4 text-nowrap flex items-center"
                                style="cursor: pointer; margin-top: 2px;">
                                分类列表
                                <span class="text-xs text-gray-400 ml-1">
                                    {{ CategoryName }}
                                </span>
                            </div>
                        </n-popselect>
                    </div>
                    <!-- 移动端展开式菜单 -->
                    <div class="md:hidden flex items-center">
                        <n-dropdown trigger="click" style="width: 200px;" :options="dropdownOptions"
                            @select="handleDropdownSelect">
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
    <div class="absolute -z-10 top-0 inset-x-0 h-screen flex justify-center overflow-hidden pointer-events-none">
        <div class="w-full h-full bg-cover bg-center bg-no-repeat">
            <picture>
                <source :srcset="getImageUrl('docs.avif')" type="image/avif"><img :src="getImageUrl('docs.png')" alt=""
                    class="w-full h-full object-cover dark:hidden z-10" decoding="async">
            </picture>
            <picture>
                <source :srcset="getImageUrl('docs-dark.avif')" type="image/avif"><img
                    :src="getImageUrl('docs-dark.png')" alt="" class="w-full h-full object-cover hidden dark:block z-10"
                    decoding="async">
            </picture>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import themeOverrides from '../themeOverrides'; // 引入自定义主题
import axios from 'axios';
import { useStore } from 'vuex'; // 引入 Vuex
import { useRoute } from 'vue-router';



//header状态管理
const isHeaderExpanded = ref(true)
const headerHeight = ref(0)

const settingsData = ref(null);
const loading = ref(true);
const route = useRoute();
const store = useStore();
const header = ref(null);
const selectedCategory = ref(0);
const categoryOptions = ref([]);
const blogListInfo = ref([]);
const lastScrollPosition = ref(0);

// 菜单数据
const menus = reactive([
    { name: "主页", href: "/" },
    { name: "友情链接", href: "/links" },
    { name: "登陆", href: "/adminlogin" },
    { name: "网盘", href: "https://pan.jiuliu.top/" },
    { name: "开往", href: "https://www.travellings.cn/go.html" },
]);

// 展开式菜单选项
const dropdownOptions = computed(() => {
    return menus.map(menu => ({
        label: menu.name,
        key: menu.href
    }));
});

// 展开式菜单选择事件
const handleDropdownSelect = (href) => {
    topage(href);
};

// 页面跳转函数
const topage = (path) => {
    window.location.href = path;
};

// 计算当前是否在首页
const isHomePage = computed(() => {
    return route.path === '/';
});

// 处理滚动事件

const handleScroll = () => {
    if (!header.value) return;

    const currentScroll = window.scrollY;
    const headerRect = header.value.getBoundingClientRect();

    // 动态计算header实际高度
    headerHeight.value = headerRect.height;

    if (currentScroll > 200) {
        isHeaderExpanded.value = currentScroll < lastScrollPosition.value;
        header.value.style.transform = isHeaderExpanded.value
            ? "translateY(0)"
            : `translateY(-${headerHeight.value}px)`;
    }

    lastScrollPosition.value = currentScroll;
    // console.log(isHeaderExpanded)
    // console.log(headerHeight)
};

// 暴露header状态给父组件
defineExpose({
    isHeaderExpanded,
    headerHeight
});

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
    store.dispatch('updateSelectedCategoryId', value);
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
const getImageUrl = (name) => {
    return new URL(`../assets/img/${name}`, import.meta.url).href;
};
</script>

<style scoped>
header {
    transition: transform 0.5s ease-in-out;
}

@media (prefers-color-scheme: dark) {
    .n-button {
        background-color: color-mix(in oklab, var(--color-white) 0%, transparent) !important;
        color: #E5E7EB !important;
    }

    .n-button:hover {
        background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
    }
}
</style>