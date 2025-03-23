<template>
    <div class="h-full w-min justify-center">
        <div v-if="loading">加载中...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <div v-if="weatherData" class="text-nowrap flex">
                <!-- <h2>{{ weatherData.city }}</h2>
                <p>温度: {{ temperature }}℃</p>
                <p>天气: {{ weatherStatus }}</p> -->
                <!-- 根据天气状况显示图标 -->
                <div v-if="weatherIcon === 'sunny'" icon="sunny"> <!-- :data-label="weatherStatus" -->
                    <span class="sun"></span>
                </div>
                <div v-else-if="weatherIcon === 'cloudy'" icon="cloudy">
                    <span class="cloud"></span>
                    <span class="cloud"></span>
                </div>
                <div v-else-if="weatherIcon === 'snowy'" icon="snowy">
                    <span class="snowman"></span>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div v-else-if="weatherIcon === 'stormy'" icon="stormy">
                    <span class="cloud"></span>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div v-else-if="weatherIcon === 'supermoon'" icon="supermoon">
                    <span class="moon"></span>
                    <span class="meteor"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import noAuthAxios from '../utils/noAuthAxios'

const API_KEY = '462d085eca5f4f7487f2afdca4527acb' // 替换为你的和风天气API Key
const city = ref('101120201') // 默认城市编码（北京）
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')

// 计算属性
const temperature = computed(() => {
    return weatherData.value?.realtime?.temp?.toFixed(1) || '--'
})

const weatherStatus = computed(() => {
    return '天气：' + weatherData.value?.realtime?.weather || '--'
})

const weatherClass = computed(() => {
    if (!weatherData.value) return {};
    const temp = parseFloat(temperature.value) || 0;
    return {
        'winter': temp < 0,
        'spring': temp >= 5 && temp <= 15,
        'warm': temp > 16
    }
})

// 判断是否为夜晚
const isNight = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 18 || hours < 6; // 18:00 到 06:00 为夜晚
}

// 根据天气状况返回对应的图标
const weatherIcon = computed(() => {
    if (isNight()) return 'supermoon'; // 夜晚强制显示 supermoon
    const weather = weatherStatus.value.toLowerCase();
    if (weather.includes('晴') || weather.includes('热') || weather.includes('冷') || weather.includes('未知')) return 'sunny';
    if (weather.includes('薄雾') || weather.includes('雾') || weather.includes('霾') || weather.includes('扬沙') || weather.includes('浮尘') || weather.includes('沙尘暴') || weather.includes('强沙尘暴') || weather.includes('浓雾') || weather.includes('强浓雾') || weather.includes('中度霾') || weather.includes('重度霾') || weather.includes('严重霾') || weather.includes('大雾') || weather.includes('特强浓雾') || weather.includes('多云') || weather.includes('少云') || weather.includes('晴间多云') || weather.includes('阴')) return 'cloudy';
    if (weather.includes('雪') || weather.includes('雨夹雪') || weather.includes('雨雪天气') || weather.includes('阵雪') || weather.includes('阵雨夹雪')) return 'snowy';
    if (weather.includes('雨') || weather.includes('雷') || weather.includes('阵雨') || weather.includes('强阵雨') || weather.includes('雷阵雨') || weather.includes('强雷阵雨') || weather.includes('雷阵雨伴有冰雹') || weather.includes('小雨') || weather.includes('中雨') || weather.includes('大雨') || weather.includes('极端降雨') || weather.includes('毛毛雨/细雨') || weather.includes('暴雨') || weather.includes('大暴雨') || weather.includes('特大暴雨') || weather.includes('冻雨') || weather.includes('小到中雨') || weather.includes('中到大雨') || weather.includes('大到暴雨') || weather.includes('暴雨到大暴雨') || weather.includes('大暴雨到特大暴雨')) return 'stormy';
    return 'default'; // 默认图标
});

const fetchWeather = async () => {
    try {
        // 参数校验增强
        if (!/^\d{9}$/.test(city.value)) {
            throw new Error('请输入9位城市编码(LocationID)');
        }
        const response = await noAuthAxios.get('/v7/weather/now', {
            params: { location: city.value, key: API_KEY }
        });

        // 打印 API 返回数据
        // console.log(response.data);

        // 强化错误处理
        if (response.data.code !== '200') {
            throw new Error(`[${response.data.code}]${response.data.message}`);
        }

        // 数据结构重构
        weatherData.value = {
            city: response.data?.location?.name || '未知城市',
            realtime: {
                temp: parseFloat(response.data?.now?.temp),
                weather: response.data?.now?.text
            }
        };
    } catch (err) {
        console.error(err);
        error.value = `请求失败：${err.message}`;
    }
};

onMounted(fetchWeather)
</script>


<style>
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