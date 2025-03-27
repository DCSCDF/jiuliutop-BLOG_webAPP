import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'




// https://vite.dev/config/
export default defineConfig({
    server: {
        https: true,
        headers: {
            // 配置 MIME 类型
        }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'css-doodle',
                },
            },
        }),
        tailwindcss(),
        basicSsl()
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


