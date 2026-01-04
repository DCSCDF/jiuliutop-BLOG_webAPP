<template>
    <footer class=" dark:bg-gray-900 mt-20">
        <div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4  sm:flex-row">
            <a href="https://log.jiuliu.top/"
                class="px-6 py-2 font-medium tracking-wide  capitalize transition-colors duration-300 transform rounded-lg focus:outline-none  focus:ring-opacity-80">
                网站监控
            </a>
            <div class="text-center text-sm text-gray-600 dark:text-gray-300">
                <div v-html="settingsData?.webcopyright"></div>
            </div>
            <div class="flex -mx-2">
                <a target="_blank" href="https://space.bilibili.com/527369547"
                    class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Reddit">
                    <svg class="w-5 h-5 fill-current" t="1735843501473" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5393" width="200" height="200">
                        <path
                            d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 0 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.114667 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z"
                            p-id="5394"></path>
                    </svg>
                </a>
                <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=VuKV5iZLSOim8mwoTefXtVL7Q01yKvxq"
                    class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Facebook">
                    <svg class="w-5 h-5 fill-current" t="1735843337704" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4235" width="200" height="200">
                        <path
                            d="M794.5 721.9c-9.7 56.1-35.7 106.6-73.3 146.4 40.8 18.9 77.6 47.7 77.6 90.3H225c0-42.6 36.9-71.3 77.6-90.3-37.6-39.8-63.7-90.3-73.3-146.4-43.1 63.2-106.8 94.5-106.8 94.5 0-164 102.5-386 102.5-386v-81.2c0-157.1 128.5-284.4 286.9-284.4 158.5 0 286.9 127.3 286.9 284.4v81.2s102.4 222 102.4 386c0.1 0-63.7-31.3-106.7-94.5z m0 0"
                            p-id="4236"></path>
                    </svg>
                </a>
                <a target="_blank" href="https://github.com/DCSCDF"
                    class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label="Github">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import themeOverrides from '../themeOverrides'; // 引入自定义主题
import axios from 'axios';
const settingsData = ref(null);
const loading = ref(true);

onMounted(async () => {
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
        loading.value = false;
    }
});

</script>
<style scoped></style>