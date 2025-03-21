import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    server: {
        headers: {
            // 配置 MIME 类型
        }
    },
    plugins: [
        vue(),
        tailwindcss(),


    ],
})
/* const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/users',
      component: Users,
      caseSensitive: false // 大小写敏感设置
    }
  ]
}) */


