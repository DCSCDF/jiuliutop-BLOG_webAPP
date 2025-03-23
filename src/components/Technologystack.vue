<template>
    <div>
        <p class="mb-2.5 text-sm text-slate-600 dark:text-slate-400" style="opacity: 1; transform: none;">
            使用的技术栈/工具：
        </p>
        <ul class="flex items-center gap-3.5 text-slate-500 dark:text-slate-500">
            <li style="opacity: 1; transform: none;">
                <div class="transition duration-200 ">
                    <font-awesome-icon :icon="['fab', 'square-js']" size="2x" />
                </div>
            </li>
            <li style="opacity: 1; transform: none;">
                <div class="transition duration-200 ">
                    <font-awesome-icon :icon="['fab', 'node']" size="2x" />
                </div>
            </li>
            <li style="opacity: 1; transform: none;">
                <div class="transition duration-200 ">
                    <font-awesome-icon :icon="['fab', 'vuejs']" size="2x" />
                </div>
            </li>

            <!-- 分割 -->
            <li style="opacity: 1; transform: none;">
                <div class="h-3 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
            </li>

            <li style="opacity: 1; transform: none;">
                <div class="transition duration-200 ">
                    <font-awesome-icon :icon="['fab', 'linux']" size="2x" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>

</script>
