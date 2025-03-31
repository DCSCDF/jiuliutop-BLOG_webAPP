<template>

    <!-- 添加滚动容器 -->
    <div ref="scrollContainer" class="scroll-container duration-100"><!-- 使我的网站旋转 animate-spin -->
        <n-config-provider>
            <n-loading-bar-provider>
                <n-dialog-provider>
                    <n-message-provider>
                        <router-view />
                    </n-message-provider>
                </n-dialog-provider>
            </n-loading-bar-provider>
        </n-config-provider>
    </div>
</template>

<script setup>


// import { ref, onMounted, onBeforeUnmount } from 'vue'
// import Scrollbar from 'smooth-scrollbar'

// const scrollContainer = ref(null)
// let scrollbar = null

// onMounted(() => {
//     // 初始化滚动条
//     if (scrollContainer.value) {
//         scrollbar = Scrollbar.init(scrollContainer.value, {
//             damping: 0.02,    // 阻尼系数 (0~1，越小阻尼越强)
//             thumbMinSize: 20, // 滚动条最小尺寸
//             renderByPixels: true,
//             alwaysShowTracks: false,
//             continuousScrolling: true,
//             plugins: {
//                 exclude: ['.child-scroll-area'] // 指定排除的选择器
//             }
//         })

//         // 可选：禁用水平滚动
//         scrollbar.track.xAxis.enabled = false
//     }
// })


// onBeforeUnmount(() => {
//     if (scrollbar) {
//         scrollbar.destroy()
//     }
// })                            
</script>

<style>
/* 隐藏原生滚动条 */
/* .scroll-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
} */

/* 自定义滚动条样式 */
/* .scroll-container .scrollbar-track {
    background: rgba(200, 200, 200, 0.2) !important;
    border-radius: 4px;
} */

/* .scroll-container .scrollbar-thumb {
    background: rgba(100, 100, 100, 0.4) !important;
    border-radius: 4px;
} */
/* 滚动条整体宽度 */
::-webkit-scrollbar {
    width: 8px;
    /* 垂直滚动条宽度 */
    height: 8px;
    /* 水平滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background: #f1f1f100;
    /* 轨道背景色 */
    border-radius: 4px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    background: #4545451e;
    /* 滑块颜色 */
    border-radius: 4px;
}

/* 滑块悬停效果 */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

:root {
    /* 浅色模式变量 */
    --n-item-color: #ffffff;
    --n-item-color-hover: #f3f3f3;
    --n-item-color-pressed: #e9e9e9;
    --n-item-border-color: #d9d9d9;
    --n-item-border-color-hover: #c5c5c5;
    --n-item-border-color-active: #2d8cf0;
    --n-item-text-color: #333333;
    --n-item-text-color-hover: #2d8cf0;
    --n-item-text-color-pressed: #1a7ad9;
    --n-item-text-color-active: #ffffff;
    --n-item-border-color-disabled: #e0e0e0;
    --n-item-color-disabled: #f7f7f7;
    --n-item-text-color-disabled: #b3b3b3;
    --n-button-color: #ffffff;
    --n-button-color-hover: #f3f3f3;
    --n-button-icon-color: #666666;
    --n-button-icon-color-hover: #2d8cf0;
}


.dark ::-webkit-scrollbar-thumb {
    background: #ffffff36;
    /* 滑块颜色 */
    border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #c9c9c91e;
    /* 滑块颜色 */
    border-radius: 4px;
}

.dark :root {
    /* 深色模式变量 */
    --n-item-color: rgba(255, 255, 255, 0.04);
    --n-item-color-hover: rgba(255, 255, 255, 0.08);
    --n-item-color-pressed: rgba(255, 255, 255, 0.12);
    --n-item-border-color: rgba(255, 255, 255, 0.09);
    --n-item-border-color-hover: rgba(255, 255, 255, 0.15);
    --n-item-border-color-active: #2d8cf0;
    --n-item-text-color: rgba(139, 139, 139, 0.82);
    --n-item-text-color-hover: #2d8cf0;
    --n-item-text-color-pressed: #1a7ad9;
    --n-item-text-color-active: #979797;
    --n-item-border-color-disabled: rgba(255, 255, 255, 0.05);
    --n-item-color-disabled: rgba(255, 255, 255, 0.02);
    --n-item-text-color-disabled: rgba(255, 255, 255, 0.3);
    --n-button-color: rgba(255, 255, 255, 0.04);
    --n-button-color-hover: rgba(255, 255, 255, 0.08);
    --n-button-icon-color: rgba(255, 255, 255, 0.5);
    --n-button-icon-color-hover: #2d8cf0;
}


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

.n-input {
    background-color: rgba(3, 7, 18, 0.05) !important;
}

.n-tag {
    background: rgba(3, 7, 18, 0.05) !important;
}

/* 深色模式下的样式 */


.dark .n-result .n-result-header .n-result-header__title {
    color: rgb(195, 204, 211) !important;
}

.dark .n-result {
    color: rgb(145, 154, 161) !important;
}

.dark .n-tag {
    background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
    color: rgb(145, 154, 161);
}

.dark .n-input {
    background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;

}

.dark .n-input__input-el {
    color: white !important;
}



pre {
    white-space: pre-wrap !important;
    /* 允许换行 */
    word-break: break-word !important;
    /* 允许单词换行 */
    background: #1f2937 !important;
    /* 背景颜色 */
}

code {
    white-space: pre-wrap !important;
    /* 允许换行 */
    word-break: break-word !important;
    /* 允许单词换行 */
}

pre {
    background: #1f2937 !important;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5 {
    /* color: none !important; */
    text-decoration: none !important;
}

.prose p img {
    display: inline-block !important;
}

:root {
    --shadow: #fd6f21 !important;
    --ring: rgb(232, 232, 232) !important;
    --blend1: #fc5830 !important;
    --blend2: #f98c24 !important;
    --blend-from: 0% !important;
    --blend-to: 100% !important;
    --blend-dir: top right !important;
}

[icon] {
    flex: none !important;
    display: none !important;
    position: relative !important;
    font-size: calc(10em + 1vmin) !important;
    width: 1em !important;
    height: 1em !important;
    margin: .3em !important;
    /* border-color: #e0e2e5 !important; */
    border-radius: 100% !important;
    box-shadow: 0 0 0 .05em var(--ring) inset, 0 0 .3em -.03em var(--shadow) !important;
    background: linear-gradient(to var(--blend-dir), var(--blend1) var(--blend-from), var(--blend2) var(--blend-to)) !important;
    /*   filter: saturate(0); */
}

/* [icon]:hover {
  filter: saturate(1);
} */
[icon]::after {
    content: attr(data-label) !important;
    position: absolute !important;
    top: calc(100% + 1vmin) !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    font: inherit !important;
    font-size: .15em !important;
}

[icon='sunny'] {
    --shadow: #fd6f21 !important;
    --blend1: #fc5830 !important;
    --blend2: #f98c24 !important;
    --blend-to: 65% !important;
}

[icon='cloudy'] {
    --shadow: #1378bb !important;
    --blend1: #1b9ce2 !important;
    --blend2: #1378bb !important;
    --shadow: #c9e8de !important;
    --blend1: #758595 !important;
    --blend2: #e0e2e5 !important;
    --blend1: #1b9ce2 !important;
    --blend-to: 65% !important;
    --blend-to: 90% !important;
}

[icon='snowy'] {
    --shadow: #c9e8de !important;
    --blend1: #758595 !important;
    --blend2: #e0e2e5 !important;
    --blend-to: 90% !important;
    --blend-dir: bottom left !important;
}

[icon='stormy'] {
    --shadow: #34c6d8 !important;
    --blend1: #4b9cc2 !important;
    --blend2: #9adbd9 !important;
}

[icon='supermoon'] {
    --shadow: #5133a5 !important;
    --blend1: #4054b2 !important;
    --blend2: #aa4cba !important;
    --blend-to: 65% !important;
    --blend-dir: bottom right !important;
}

/* SUNNY */
/* --------------------- */
.sun {
    position: absolute !important;
    top: 20% !important;
    left: 80% !important;
    transform: translate(-50%, -50%) !important;
    width: 40% !important;
    height: 40% !important;
    border-radius: 100% !important;
    background: #ffeb3b !important;
    box-shadow: 0 0 0 .02em var(--ring) inset, 0 0 .3em -.03em var(--shadow) !important;
    transform-origin: .1em .1em !important;
}

.sun::after {
    content: '' !important;
    position: absolute !important;
    top: .1em !important;
    left: 0 !important;
    will-change: transform !important;
    transform: translate(-50%, -50%) !important;
    width: .1em !important;
    height: .1em !important;
    border-radius: 100% !important;
    background: rgba(255, 255, 255, .1) !important;
    box-shadow: 0 0 .1em 0 rgba(255, 255, 255, .3) inset, -.1em -.1em 0 .2em rgba(255, 255, 255, .1) !important;
    animation: flare 12000ms infinite alternate linear !important;
}

/* CLOUDY */
/* --------------------- */
.cloud {
    position: absolute;
    top: .1em;
    left: 65%;
    width: .37em;
    height: .13em;
    border-radius: .1em;
    background-color: #fff !important;
    box-shadow: 0 0 .1em .02em var(--ring) inset, 0 0 .3em -.03em var(--shadow);
    animation: move 3000ms infinite ease-in-out;
}

.cloud+.cloud {
    top: 25%;
    left: 40%;
    animation: move 3700ms infinite linear;
}

.cloud::before,
.cloud::after {
    content: '';
    position: inherit;
    border-radius: inherit;
    background-color: inherit;
    box-shadow: inherit;
    bottom: 30%;
}

.cloud::before {
    left: .05em;
    width: .2em;
    height: .2em;
}

.cloud::after {
    left: .15em;
    width: .15em;
    height: .15em;
}

/* SNOWY */
/* --------------------- */
[icon='snowy'] ul {
    position: absolute;
    list-style: none;
    top: 0%;
    left: 10%;
    right: 0%;
    height: 100%;
    margin: 0;
    padding: 0;
}

[icon='snowy'] li::before,
[icon='snowy'] li::after {
    content: '';
    position: absolute;
    list-style: none;
    width: .015em;
    height: .01em;
    border-radius: 100%;
    background-color: var(--ring) !important;
    will-change: transform, opacity;
    animation: snow 3700ms infinite ease-out !important;
    opacity: 0;
}

[icon='snowy'] li:nth-child(2n+1)::before,
[icon='snowy'] li:nth-child(13n+11)::after {
    top: -7%;
    left: 40%;
}

[icon='snowy'] li:nth-child(3n+2)::before,
[icon='snowy'] li:nth-child(11n+7)::after {
    top: 5%;
    left: 90%;
    animation-delay: 1000ms;
}

[icon='snowy'] li:nth-child(5n+3)::before,
[icon='snowy'] li:nth-child(7n+5)::after {
    top: -10%;
    left: 80%;
    animation-delay: 2000ms;
}

[icon='snowy'] li:nth-child(7n+5)::before,
[icon='snowy'] li:nth-child(5n+3)::after {
    top: 10%;
    left: 10%;
    animation-delay: 1300ms;
}

[icon='snowy'] li:nth-child(11n+7)::before,
[icon='snowy'] li:nth-child(3n+2)::after {
    top: 20%;
    left: 70%;
    animation-delay: 1500ms;
}

[icon='snowy'] li:nth-child(13n+11)::before,
[icon='snowy'] li:nth-child(2n+1)::after {
    top: 35%;
    left: 20%;
    animation-delay: 500ms;
}

.snowman {
    position: absolute;
    bottom: 30%;
    left: 40%;
    width: .15em;
    height: .15em;
    opacity: .9;
    background: var(--ring) !important;
    border-radius: 100%;
}

.snowman::after {
    content: '';
    position: absolute;
    top: 90%;
    left: 30%;
    transform: translate(-50%, 0%);
    width: .275em;
    height: .3em;
    border-radius: inherit;
    background-color: var(--ring) !important;
}

.snowman::before {
    content: '';
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-55%, -50%);
    width: .45em;
    height: .4em;
    border-radius: 60%;
    border: .02em solid transparent;
    border-bottom-color: var(--blend1);
    will-change: border-radius;
    animation: snowman 9000ms infinite ease-in;
}

/* STORMY */
/* --------------------- */
[icon='stormy']::before {
    --shadow: rgba(255, 255, 255, 0) !important;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: .05em;
    border-radius: 100%;
    opacity: .4;
    will-change: background-color;
    animation: flash 2300ms infinite linear 80ms;
}

[icon='stormy'] .cloud {
    --shadow: #c9e8de !important;
    --ring: #f0f2f0 !important;
    background-color: var(--shadow) !important;
    font-size: 1.3em;
    left: 50%;
    will-change: background-color, transform, opacity;
    animation: flash 2300ms infinite linear, move 3700ms infinite linear;
}

[icon='stormy'] ul {
    position: absolute;
    list-style: none;
    top: 0%;
    left: 70%;
    right: 0%;
    height: 100%;
    margin: 0;
    padding: 0;
}

[icon='stormy'] li,
[icon='stormy'] li::before,
[icon='stormy'] li::after {
    position: absolute;
    width: .005em;
    height: .02em;
    border-radius: 10%;
    background-color: #eee !important;
    opacity: 0;
    will-change: transform, opacity;
    animation: rain 2000ms infinite linear;
    transform: rotate(25deg);
}

[icon='stormy'] li::before,
[icon='stormy'] li::after {
    content: '';
}

[icon='stormy'] li:nth-child(5n+3)::before,
[icon='stormy'] li:nth-child(11n+7)::after,
[icon='stormy'] li:nth-child(2n+1) {
    top: 10%;
    left: 68%;
    animation-delay: 500ms;
}

[icon='stormy'] li:nth-child(3n+2)::after,
[icon='stormy'] li:nth-child(7n+5)::after,
[icon='stormy'] li:nth-child(3n+2) {
    top: 5%;
    left: 45%;
    animation-delay: 1250ms;
}

[icon='stormy'] li:nth-child(2n+1)::before,
[icon='stormy'] li:nth-child(5n+3)::after,
[icon='stormy'] li:nth-child(7n+5) {
    top: 4%;
    left: 82%;
    animation-delay: 750ms;
}

[icon='stormy'] li:nth-child(11n+7)::before,
[icon='stormy'] li:nth-child(3n+2)::after,
[icon='stormy'] li:nth-child(7n+5) {
    top: 15%;
    left: 15%;
    animation-delay: 2000ms;
}

[icon='stormy'] li:nth-child(7n+5)::before,
[icon='stormy'] li:nth-child(2n+1)::after,
[icon='stormy'] li:nth-child(11n+7) {
    top: 10%;
    left: 33%;
    animation-delay: 2500ms;
}

/* SUPERMOON */
/* --------------------- */
[icon="supermoon"]::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        radial-gradient(1px 1px at 50% 20%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 30% 65%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 15% 05%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 37% 35%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 65% 47%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 42% 29%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 73% 56%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 24% 19%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 31% 47%, #fff, rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 18% 39%, #fff, rgba(0, 0, 0, 0)) !important;

    background-repeat: repeat;
    will-change: transform;
    animation: revolve 120000ms linear infinite;
}

.moon {
    position: absolute;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    border-radius: 100%;
    background: radial-gradient(circle at bottom left, var(--ring), #fef07e) !important;
    box-shadow: 0 0 0 .02em var(--ring) inset, 0 0 .3em -.03em var(--blend2) !important;
}

.moon::before,
.moon::after {
    content: '';
    position: absolute;
    border-radius: 100%;
    background-color: var(--blend1);
    box-shadow: .01em .01em .1em 0 var(--blend1);
}

.moon::before {
    top: 15%;
    left: 55%;
    width: 20%;
    height: 20%;
    opacity: .3;
}

.moon::after {
    bottom: 50%;
    left: 25%;
    width: 15%;
    height: 15%;
    opacity: .2;
}

.meteor {
    position: absolute;
    background-color: #fff !important;
    opacity: 0;
    top: 20%;
    left: 55%;
    width: 1px;
    height: 15px;
    transform: rotate(45deg);
    will-change: transform, opacity;
    animation: meteor 6250ms infinite ease-in;
}

[icon="sunny"] {
    display: block !important;
}

[icon="cloudy"] {
    display: block !important;
}

[icon="snowy"] {
    display: block !important;
}

[icon="stormy"] {
    display: block !important;
}

[icon="supermoon"] {
    display: block !important;
}

@keyframes flare {
    to {
        transform: translate(-.3em, .3em);
        opacity: .4;
        font-size: .2em;
    }
}

@keyframes move {
    50% {
        transform: translateX(-.05em);
    }
}

@keyframes snow {
    50% {
        opacity: 1;
    }

    100% {
        transform: translate(-.1em, 15vmin);
    }
}

@keyframes snowman {
    50% {
        border-radius: 60% 60% 30% 50% !important;
    }
}

@keyframes flash {
    49% {
        background-color: var(--shadow) !important;
    }

    51% {
        background-color: var(--ring) !important;
    }

    53% {
        background-color: var(--shadow) !important;
    }

    57% {
        background-color: var(--ring) !important;
    }

    85% {
        background-color: var(--shadow) !important;
    }
}

@keyframes rain {
    10% {
        opacity: .4;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: translate(-.1em, .5em) !important;
    }
}

@keyframes revolve {
    to {
        transform: rotate(360deg) !important;
    }
}

@keyframes meteor {
    5% {
        opacity: 1;
    }

    8% {
        transform: translate(-.6em, .6em) rotate(45deg) !important;
        opacity: 0;
    }
}
</style>