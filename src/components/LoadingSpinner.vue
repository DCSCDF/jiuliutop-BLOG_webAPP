<template>
    <div id="loadingScreen" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 dark:bg-gray-800">
        <div class="loading">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>

<script setup>
// 无需额外的逻辑，纯 UI 组件
</script>

<style scoped>
.loading i {
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
</style>