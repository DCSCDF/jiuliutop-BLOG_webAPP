<!-- src/components/ThemeToggle.vue -->
<template>
    <div class="flex items-center gap-2 flex-row ml-3">
        <!-- 胶囊样式容器 -->
        <div class="inline-flex bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
            <!-- 左侧主题切换按钮 -->
            <button @click="toggleTheme" :disabled="followSystem" :class="[
                'pl-2 pr-1 py-1 transition-colors text-nowrap rounded-l-full',
                followSystem ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                    isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            ]">
                {{ isDark ? '浅色' : '深色' }}
            </button>
            <!-- 右侧系统跟随切换 -->
            <button @click="toggleSystemFollow" class="pl-1 pr-2 py-1 transition-colors text-nowrap rounded-r-full"
                :class="followSystem ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'">
                {{ followSystem ? '系统' : '手动' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'

const isDark = ref(false)
const followSystem = ref(false)
const systemDark = ref(false)

// 检测系统主题变化
const systemThemeWatcher = window.matchMedia('(prefers-color-scheme: dark)')

// 初始化主题
const initTheme = () => {
    const savedTheme = localStorage.getItem('tw-theme')
    const savedFollow = localStorage.getItem('tw-follow-system')

    // 优先使用用户设置，其次使用系统设置
    if (savedFollow === 'true') {
        followSystem.value = true
        isDark.value = systemThemeWatcher.matches
    } else if (savedTheme) {
        isDark.value = savedTheme === 'dark'
    } else {
        // 首次访问，默认跟随系统
        followSystem.value = true
        isDark.value = systemThemeWatcher.matches
    }

    systemDark.value = systemThemeWatcher.matches
    applyTheme()
}

// 应用主题到NaiveUI和其他组件
const applyTheme = () => {
    // 同时设置class和data-theme属性确保兼容性
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')

    // 更新Tailwind使用的CSS变量
    document.documentElement.style.setProperty('--color-scheme', isDark.value ? 'dark' : 'light')
}

// 切换主题
const toggleTheme = () => {
    if (followSystem.value) return
    isDark.value = !isDark.value
    localStorage.setItem('tw-theme', isDark.value ? 'dark' : 'light')
    localStorage.setItem('tw-follow-system', 'false')
    followSystem.value = false
    applyTheme()
}

// 切换系统跟随
const toggleSystemFollow = () => {
    followSystem.value = !followSystem.value
    localStorage.setItem('tw-follow-system', followSystem.value)

    if (followSystem.value) {
        isDark.value = systemThemeWatcher.matches
        applyTheme()
    }
}

// 监听系统主题变化
const handleSystemThemeChange = (e) => {
    systemDark.value = e.matches
    if (followSystem.value) {
        isDark.value = systemDark.value
        applyTheme()
    }
}

onMounted(() => {
    initTheme()
    systemThemeWatcher.addEventListener('change', handleSystemThemeChange)
})

// 组件卸载时移除监听器
onUnmounted(() => {
    systemThemeWatcher.removeEventListener('change', handleSystemThemeChange)
})

// 确保NaiveUI组件也能响应主题变化
watch(isDark, () => {
    if (window.$message) {
        window.$message.success(`已切换至${isDark.value ? '深色' : '浅色'}模式`)
    }
})
</script>