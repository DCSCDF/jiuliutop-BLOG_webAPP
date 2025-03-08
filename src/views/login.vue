<template>
    <div class="flex flex-col min-h-screen">
        <Header></Header>
        <main class="mb-auto">
            <div
                class="inset-0 p-8 h-min w-full max-w-sm m-auto  dark:border-none mx-auto mt-20 lg:mt-24 bg-white/80 rounded-xl border border-gray-200 dark:bg-gray-800/50">
                <div class="flex mt-2 font-bold text-gray-700 dark:text-gray-300 text-xl justify-center mx-auto">
                    <h1>JIULIUTOP-管理员登陆</h1>
                </div>
                <div class='mt-6' title="管理员后台登陆">
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
                    <n-button @click="login" color="#4c5564" type="primary" size="medium">
                        登陆
                    </n-button>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>
<script>
import { ref, reactive, onMounted, inject } from "vue";
import { NButton, NForm, NFormItem, NInput, NCheckbox } from 'naive-ui';
import axios from 'axios';
import themeOverrides from '../themeOverrides'; //引入自定义主题
import { AdminStore } from '../stores/AdminStore';
import { createDiscreteApi } from "naive-ui";
import Header from '../components/Header.vue';
import Footer from "../components/Footer.vue";

//lu you
import { useRouter, useRoute } from 'vue-router'



const adminStore = AdminStore();

const rules = {
    account: [
        {
            required: true,
            message: "请输入账号",
            trigger: "blur"
        },
        {
            min: 3,
            max: 12,
            message: "账号长度在3到12个字符",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            min: 6,
            max: 18,
            message: "密码长度在6到18个字符",
            trigger: "blur"
        }
    ]
};

const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") === "1" || false
});

const formRef = ref(null);
let { message } = createDiscreteApi(["message"]);


export default {
    components: {
        //在这里引入组件
        NButton,
        NForm,
        NFormItem,
        NInput,
        NCheckbox,
        Header,
        Footer
    },
    mounted() {
        this.verifyToken();
    },
    methods: {
        async verifyToken() {
            const token = localStorage.getItem('admin_token');
            if (token) {
                try {
                    const response = await axios.get('/admin/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.status === 200) {
                        this.$router.push('/dashboard/');
                        message.info("已经登陆过了");
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    this.$router.push('/adminlogin');
                }
            } else {
                // 没有token，可能需要重新登录或跳转到登录页面
                this.$router.push('/adminlogin');
                message.error("未登录！");
            }
        }
    },
    setup() {

        const router = useRouter();
        const route = useRoute();
        // 将 onMounted 移到 setup 函数内部
        onMounted(() => {
            // 这里可以进行一些初始化操作
            console.log("组件已挂载");
        });

        const login = async () => {
            const isValid = await formRef.value.validate();
            if (!isValid) {
                // 验证失败，显示错误提示
                message.error({ content: "验证未通过，请检查输入", duration: 5000 });
                return;
            }

            try {
                let result = await axios.post("/admin/login", {
                    account: admin.account,
                    password: admin.password
                });

                if (result.data.code === 200) {
                    // 登录成功
                    adminStore.token = result.data.data.token;
                    adminStore.account = result.data.data.account;
                    adminStore.id = result.data.data.id;
                    localStorage.setItem('admin_token', result.data.data.token);
                    console.log("登录成功:", result.data.code);
                    message.success("登录成功");

                    // 记住我功能
                    if (admin.rember) {
                        localStorage.setItem("account", admin.account);
                        localStorage.setItem("password", admin.password);
                        localStorage.setItem("rember", admin.rember ? "1" : "0");
                    }

                    router.push("/dashboard")
                } else {
                    // 登录失败
                    console.log("登录失败:", result.data.data.message);
                    message.error({ content: result.data.data.message || "登录失败，请重试", duration: 5000 });
                }

            } catch (error) {
                console.error("登录请求失败:", error.response ? error.response.data : error.message);
                message.error("登录失败，请检查您的账号或密码");
            }
        };

        return {
            rules,
            admin,
            login,
            formRef,
            themeOverrides
        };
    }
};

</script>

<style scoped>
.n-button {
    width: 100%;
}

@media (prefers-color-scheme: dark) {
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