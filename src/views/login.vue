<template>
    <div class="flex flex-col min-h-screen">
        <!-- 加载动画 -->
        <LoadingSpinner v-if="isLoading" />
        <!-- 错误提示 -->
        <div v-else-if="isError" class="flex justify-center items-center min-h-screen">
            <n-result status="error" title="API加载失败" description="请稍后重试或联系管理员">
                <template #footer>
                    <n-button type="primary" @click="retryLoading" :theme-overrides="themeOverrides">重试</n-button>
                </template>
            </n-result>
        </div>
        <Header></Header>
        <main class="mb-auto">
            <div
                class="inset-0 p-8 h-min w-full max-w-sm m-auto  dark:border-none mx-auto mt-20 lg:mt-24 bg-white/80 rounded-xl border border-gray-200 dark:bg-gray-800/50">
                <div class="flex mt-2 font-bold text-gray-700 dark:text-gray-300 text-xl justify-center mx-auto">
                    <h1>JIULIUTOP-管理员登陆</h1>
                </div>
                <div class='mt-6' title="管理员后台登陆">
                    <div v-if="cooldown" class="text-red-500 text-sm mb-2">
                        账户已锁定，请{{ remainingMinutes }}分钟后再试
                    </div>
                    <n-form ref="formRef" :rules="rules" :model="admin">
                        <n-form-item path="account" label="账号">
                            <n-input :bordered="false" v-model:value="admin.account" placeholder="请输入账号"
                                :theme-overrides="themeOverrides" />
                        </n-form-item>
                        <n-form-item path="password" label="密码">
                            <n-input :bordered="false" v-model:value="admin.password" type="password"
                                placeholder="请输入密码" :theme-overrides="themeOverrides" />
                        </n-form-item>
                    </n-form>
                    <n-checkbox class="my-4" v-model:checked="admin.rember" label="记住账号密码"
                        :theme-overrides="themeOverrides" />
                    <n-button @click="login" :disabled="cooldown || loginBtnDisabled" :loading="loginBtnDisabled"
                        :theme-overrides="themeOverrides">
                        {{ cooldown ? `锁定中（剩余${remainingMinutes}分钟）` : "登录" }}
                    </n-button>
                    <!-- 剩余尝试提示 -->
                    <div v-if="remainingAttempts < 5 && !cooldown" class="text-yellow-500 text-sm mt-2">
                        剩余尝试次数：{{ remainingAttempts }}
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from "vue";
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui'; // 导入 useMessage
import axios from 'axios';
import themeOverrides from '../themeOverrides';
import { AdminStore } from '../stores/AdminStore';
import Header from '../components/Header.vue';
import Footer from "../components/Footer.vue";
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const adminStore = AdminStore();
const message = useMessage();

// 防抖相关状态
const cooldown = ref(false);
const remainingAttempts = ref(5);
const remainingMinutes = ref(30);
const loginBtnDisabled = ref(false);
const isLoading = ref(false);
const isError = ref(false);
let lockTimer = null;

// 登录表单
const formRef = ref(null);
const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") === "1" || false
});

// 表单验证规则
const rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在3到12个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在6到18个字符", trigger: "blur" }
    ]
};

// 冷却倒计时逻辑
const startCooldownTimer = () => {
    let seconds = 1800;
    lockTimer = setInterval(() => {
        remainingMinutes.value = Math.ceil(seconds / 60);
        seconds--;
        if (seconds < 0) {
            clearInterval(lockTimer);
            cooldown.value = false;
            remainingAttempts.value = 5;
        }
    }, 1000);
};


// 登录处理
const login = async () => {
    if (cooldown.value) return;

    loginBtnDisabled.value = true;
    try {
        const result = await axios.post("/admin/login", {
            account: admin.account,
            password: admin.password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        // console.log(result);
        // console.log("Request Body:", {
        //     account: admin.account,
        //     password: admin.password
        // });
        if (result.data.code === 200) {
            // 登录成功处理
            const adminInfo = result.data.data;
            adminStore.token = adminInfo.token;
            localStorage.setItem('admin_token', adminInfo.token);

            if (admin.rember) {
                localStorage.setItem("account", admin.account);
                localStorage.setItem("password", admin.password);
                localStorage.setItem("rember", admin.rember ? "1" : "0");
            }

            // 跳转到仪表盘
            await router.push("/dashboard");
        } else {
            // 登录失败处理
            throw new Error(result.data.msg || "登录失败");
        }
    } catch (error) {
        // console.error("登录失败:", error);
        if (error.response) {
            // 服务器返回的错误
            const res = error.response.data || {};
            if (res.code === 429) {
                // 冷却状态处理
                cooldown.value = true;
                startCooldownTimer();
            } else if (res.code === 500) {
                // 普通失败处理
                remainingAttempts.value -= 1;
                if (remainingAttempts.value <= 0) {
                    cooldown.value = true;
                    startCooldownTimer();
                }
            }
            // 显示API返回的错误信息
            message.error(res.msg || "登录失败，请检查账号或密码");
        } else if (error.request) {
            // 请求未发送到服务器
            message.error("无法连接到服务器，请检查网络连接");
        } else {
            // 其他错误
            message.error(error.message || "登录失败，请检查账号或密码");
        }
    } finally {
        loginBtnDisabled.value = false;
    }
};
// 组件卸载时清理定时器
onBeforeUnmount(() => {
    if (lockTimer) clearInterval(lockTimer);
});

// 暴露模板需要的响应式状态
defineExpose({
    cooldown,
    remainingAttempts,
    remainingMinutes,
    loginBtnDisabled,
    admin,
    formRef,
    themeOverrides,
    login
});
</script>


<style scoped>
.n-button {
    width: 100%;
}

@media (prefers-color-scheme: dark) {

    :deep(.n-input .n-input__input-el,
        .n-input .n-input__textarea-el) {
        color: var(--color-white) !important;
    }

    .n-button {
        width: 100%;
        border-color: rgba(255, 255, 255, 0.131) !important;
        color: var(--color-white);
    }

    .n-card {
        background-color: color-mix(in oklab, var(--color-white) 0%, transparent) !important;
        border-color: rgba(255, 255, 255, 0.131) !important;
        margin-bottom: 16px !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0.5rem !important;
        cursor: pointer !important;

    }

    .n-tag {
        background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
        color: rgb(145, 154, 161);
    }

    .n-input {
        background-color: color-mix(in oklab, var(--color-white) 5%, transparent) !important;
    }

    :deep(.n-form-item-label__text) {
        color: aliceblue !important;
    }

    :deep(.n-checkbox__label) {
        color: aliceblue !important;
    }
}
</style>