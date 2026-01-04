import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

let routes = [
    {
        path: "/",
        component: () => import("../views/home.vue")
    },
    {
        path: "/detail",
        component: () => import("../views/detail.vue")
    },
    {
        path: "/links",
        component: () => import("../views/links.vue")
    },
    {
        path: "/adminlogin",
        component: () => import("../views/login.vue")
    },
    {
        path: "/guestbook",
        component: () => import("../views/guestbook.vue")
    },
    {
        path: "/dashboard",
        component: () => import("../views/dashboard/Dashboard.vue"),
        meta: { requiresAuth: true }, // 标记需要认证

        children: [
            {
                path: "",
                redirect: "/dashboard/article"
            },
            {
                path: "/dashboard/category",
                component: () => import("../views/dashboard/Category.vue")
            },
            {
                path: "/dashboard/article",
                component: () => import("../views/dashboard/Article.vue"),
                // meta: { requiresAuth: true } // 如果需要权限验证
            },
            {
                path: "/dashboard/link",
                component: () => import("../views/dashboard/link.vue")
            }
        ]
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('admin_token'); // 统一token键名

    if (to.path === '/adminlogin') {
        if (token) {
            next('/dashboard'); // 已登录用户强制跳转后台
        } else {
            next(); // 未登录用户允许访问登录页
        }
        return;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/adminlogin');
            return;
        }

        try {
            const response = await axios.get("/admin/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 根据实际API响应结构调整（示例假设成功状态码为200）
            if (response.data.code === 200) {
                next();
            } else {
                localStorage.removeItem("admin_token");
                next('/adminlogin');
            }
        } catch (error) {
            // 处理网络错误和401未授权
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem("admin_token");
                next('/adminlogin');
            } else {
                // next('/error'); // 处理其他错误，跳转到错误页面
            }
        }
    } else {
        next();
    }
});

export { router, routes };