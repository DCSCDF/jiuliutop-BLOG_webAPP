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
                component: () => import("../views/dashboard/Article.vue")
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
    // 1. 如果是登录页，直接放行
    if (to.path === '/adminlogin') {
        next();
        return; // 终止后续逻辑
    }
    // 2. 检查是否需要认证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/admin/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                next(); // 认证通过
            } else {
                next('/adminlogin'); // 认证失败，跳转登录
            }
        } catch (error) {
            localStorage.removeItem("token");
            next('/adminlogin'); // 异常情况跳转登录
        }
    } else {
        next(); // 无需认证的路由直接放行
    }
});

export { router, routes };