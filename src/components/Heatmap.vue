<template>
    <!-- 热力图 -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <div class="flex-1 space-y-6">
            <n-card :content-style="{ padding: 0 }">
                <div class="m-5">
                    <!-- {{ url }} -->
                    <img :src="url" alt="jiuliu's Github chart" />
                </div>
            </n-card>
        </div>
        <div class="w-full md:w-50 lg:w-70 xl:w-96"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
const url = "https://ghchart.rshah.org/DCSCDF";

// 生命周期钩子
onMounted(() => {
    url();
});

</script>
