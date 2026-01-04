<template>
    <n-card :content-style="{ padding: 0 }"
        style="background-color: color-mix(in oklab, var(--color-white) 60%, transparent); height: fit-content; border-radius: 0.5rem; max-width: 100% !important;">
        <div class="p-5">
            <div class="space-y-3">
                <div class="flex flex-col mb-1 gap-2">
                    <div>
                        <div>
                            <div class="flex items-center justify-center">
                                <img class="object-cover w-20 h-20 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                    :src="settingsData[0]?.img_url" alt="">
                            </div>

                            <div class="mt-2 text-center">
                                <h3 class="flex justify-center font-medium leading-6 text-xl text-gray-600 capitalize dark:text-gray-300"
                                    id="modal-title">
                                    {{ settingsData[0]?.account }}
                                </h3>

                                <!-- <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    jieasdasdasdasd
                                </p> -->

                            </div>

                            <!-- 分割线 -->
                            <div class="my-4 border-b dark:border-gray-700 border-gray-200"></div>

                            <!-- 统计数据 -->
                            <div class="flex flex-row justify-center">
                                <div class="flex flex-col mx-4 lg:mx-8 justify-center">
                                    <h2 class="w-15 text-gray-600  dark:text-gray-300">
                                        文章总数
                                    </h2>
                                    <p class="flex text-gray-500  dark:text-gray-300 justify-center">
                                        {{ blogData.count }}
                                    </p>
                                </div>
                                <div class="flex flex-col mx-4 lg:mx-8 justify-center">
                                    <h2 class="w-15 text-gray-600  dark:text-gray-300">
                                        分类总数
                                    </h2>
                                    <p class="flex text-gray-500  dark:text-gray-300 justify-center">
                                        {{ categoryData.length }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-3 flex justify-center">
                                <n-button @click="navigateToNewTab" color="#4b5563"
                                    :theme-overrides="themeOverrides">Github项目下载地址</n-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import themeOverrides from '../themeOverrides';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToNewTab = () => {
    const url = 'https://github.com/DCSCDF/jiuliutop-BLOG_webAPP'; // 完整的 URL
    window.open(url, '_blank'); // 直接打开链接
};

// 将初始值设置为空数组
const settingsData = ref([]);
const admininfo = async () => {
    try {
        const res = await axios.get(`/admin/public-info`);
        if (res.data.code === 200) {
            settingsData.value = res.data.data; // 将数据赋给 settingsData
            // console.log('Data loaded:', settingsData.value);
        } else {
            console.error('未找到对应数据');
        }
    } catch (error) {
        console.error('查询失败', error);
    }
};

const blogData = ref([]);
const bloginfo = async () => {
    try {
        const res = await axios.get(`/blog/search`);
        if (res.data.code === 200) {
            blogData.value = res.data.data;
            // console.log('blog:', blogData.value);
        } else {
            console.error('未找到对应数据');
        }
    } catch (error) {
        console.error('查询失败', error);
    }
};

const categoryData = ref([]);
const categoryinfo = async () => {
    try {
        const res = await axios.get(`/category/list`);
        if (res.data.code === 200) {
            categoryData.value = res.data.data;
            // console.log('123:', categoryData.value);
        } else {
            console.error('未找到对应数据');
        }
    } catch (error) {
        console.error('查询失败', error);
    }
};

// 页面加载时调用
onMounted(() => {
    admininfo();
    bloginfo();
    categoryinfo();

});
</script>

<style scoped></style>