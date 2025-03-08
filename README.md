# JIULIUTOP-APP 项目结构文档

## 📁 完整目录树
```bash
JIULIUTOP-APP/
├── .vscode/               # VSCode编辑器配置目录
├── dist/                  # 生产环境构建输出目录
├── node_modules/          # 项目依赖包目录
├── public/                # 公共静态资源目录
└── src/                   # 核心源代码目录
    ├── assets/            # 静态资源管理
    │   ├── css/           # 全局样式文件
    │   └── img/           # 图片资源
    │       └── yahei.ttf  # 微软雅黑字体文件
    ├── common/            # 公共工具类/方法
    ├── components/        # 通用组件库
    ├── stores/            # 状态管理仓库
    ├── views/             # 页面视图组件
    │   ├── dashboard/     # 数据看板模块
    │   ├── detail.vue     # 文章详情页
    │   ├── home.vue       # 首页入口文件
    │   ├── links.vue      # 友情链接页
    │   ├── login.vue      # 用户登录页
    │   ├── Test.vue       # 测试组件
    │   └── App.vue        # 根组件
    ├── main.js            # 项目主入口文件
    ├── themeOverrides.js  # UI主题覆盖配置
├── .gitignore             # Git版本控制排除文件
├── index.html             # 项目入口HTML
├── package-lock.json      # 依赖版本锁文件
├── package.json           # 项目配置清单
├── postcss.config.js      # PostCSS配置
├── README.md              # 项目说明文档
└── vite.config.js         # Vite构建配置
```
## 🚀 项目特性
- ​**模块化设计**：项目采用模块化设计，包含 `assets`、`components`、`views` 等目录，便于扩展和维护。
- ​**现代化技术栈**：基于 Vue 3.x + Vite 构建，支持高效开发和快速构建。
- ​**路由与状态管理**：使用 Vue Router 和 Pinia/Vuex 管理页面路由和全局状态。
- ​**静态资源管理**：通过 `assets` 目录管理 CSS、图片和字体等静态资源。

### 功能模块
  模块         对应文件               功能描述                      
| 首页展示    | `home.vue`          | 博客文章瀑布流展示              
| 文章详情    | `detail.vue`        | 使用富文本编辑器展示的详情页面     
| 后台管理    | `dashboard/`        | 含数据可视化的管理控制台          
| 用户后台    | `login.vue`         | 后台登录   
| 友情链接    | `links.vue`         | 朋友们的链接聚合页      

## 🛠️ 快速启动

### 开发环境
```bash
#克隆项目
git clone https://github.com/your-repo/JIULIUTOP-APP.git
cd JIULIUTOP-APP

# 安装依赖
npm install 或 pnpm install

# 启动开发服务器
npm run dev 或 pnpm dev

# 访问地址
http://localhost:5173/

# 构建服务端启动版本
npm run build 或 pnpm build

# 预览构建结果
npm run preview 或 pnpm preview
```
## 如果需要进一步调整或补充内容，请随时告诉我！ 😊





