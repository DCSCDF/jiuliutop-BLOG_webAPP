<template>
    <!-- 导航按钮 -->
    <button
        class="absolute left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/50 shadow-lg hover:bg-gray-100 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': scrollPos === 0 }" @click="scroll(-1)" :disabled="scrollPos === 0">
        <n-icon size="24" class="text-gray-600">
            <ChevronBack />
        </n-icon>
    </button>

    <button
        class="absolute right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/50 shadow-lg hover:bg-gray-100 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': isEnd }" @click="scroll(1)" :disabled="isEnd">
        <n-icon size="24" class="text-gray-600">
            <ChevronForward />
        </n-icon>
    </button>
    <!-- 卡片容器 -->
    <div class="overflow-hidden p-10">
        <div ref="cardsContainer" class=" flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(${scrollPos}px)` }">
            <div class="flex-1"></div> <!-- 前占位 -->
            <n-card v-for="(card, index) in blogListInfo_card" :key="index" style="background-color: rgba(0, 0, 0, 0);"
                class="flex-shrink-0 mx-2 w-48 h-64 transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden"
                hoverable>
                <!-- 模糊背景图片 -->
                <div class="absolute inset-0 z-0 bg-white/60 " :style="{
                    /*     backgroundImage: `url(${card.imageUrl})`, */

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)', // 模糊效果
                    transform: `rotate(${card.rotation}deg)`,

                }"></div>
                <div class="h-full flex items-center justify-center">
                    <div class="text-gray-600 text-center">
                        <p class="text-lg mb-2">{{ card.title }}</p>
                        <p class="text-sm opacity-75">{{ card.content }}</p>
                    </div>
                </div>
            </n-card>
            <div class="flex-1"></div> <!-- 后占位 -->
        </div>
    </div>
</template>
<script setup>


// 卡片数据生成
const randomRotation = () => (Math.random() * 10 - 5).toFixed(1)
const pastelColors = [
    '#f2f5f9'
]
const cards = Array.from({ length: 4 }).map(() => ({
    rotation: randomRotation(),
    color: pastelColors[Math.floor(Math.random() * pastelColors.length)]
}))

// 滚动逻辑
const cardsContainer = ref(null)
const scrollPos = ref(0)
const cardWidth = 200 // 根据实际卡片宽度调整
const gap = 16 // 根据实际间距调整

const isEnd = computed(() => {
    const maxScroll = (cards.length * (cardWidth + gap)) - cardsContainer.value?.parentElement.offsetWidth
    return scrollPos.value <= -maxScroll
})

const scroll = (direction) => {
    const containerWidth = cardsContainer.value.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    const scrollAmount = visibleCards * (cardWidth + gap) * direction;

    // 新位置 = 当前位置 - scrollAmount（因为direction=1时应该向左滚动）
    const newPos = scrollPos.value - scrollAmount;

    // 计算最大可滚动距离
    const maxScroll = (cards.length * (cardWidth + gap)) - containerWidth;
    // 限制newPos在 -maxScroll 和 0 之间
    scrollPos.value = Math.max(Math.min(newPos, 0), -maxScroll);
}
</script>
<style scoped></style>
