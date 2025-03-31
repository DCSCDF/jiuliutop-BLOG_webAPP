// 从环境变量获取配置
const commentConfig = {
    scriptUrl: import.meta.env.VITE_COMMENT_SCRIPT_URL,
    apiEndpoint: import.meta.env.VITE_COMMENT_API_ENDPOINT
}

const API = {
    Url: import.meta.env.VITE_API_BASE_URL
}

// 开发环境配置验证
if (import.meta.env.DEV) {
    const requiredVars = [
        'VITE_COMMENT_SCRIPT_URL',
        'VITE_COMMENT_API_ENDPOINT',
        'VITE_API_BASE_URL'
    ]

    requiredVars.forEach(varName => {
        if (!import.meta.env[varName]) {
            console.error(`缺少环境变量: ${varName}`)
        }
    })
}

export { API, commentConfig }

export const setupComment = (elementId, blogId) => {
    // 动态加载twikoo CDN
    const loadTwikoo = () => new Promise((resolve, reject) => {
        if (window.twikoo) return resolve();

        const script = document.createElement('script');
        script.src = commentConfig.scriptUrl;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    // 初始化评论
    const init = async () => {
        try {
            await loadTwikoo();
            twikoo.init({
                envId: commentConfig.apiEndpoint,
                el: `#${elementId}`,
                path: blogId
            });
        } catch (err) {
            console.error('评论初始化失败:', err);
        }
    };

    init();
};

export const setupCommentSystem = async (elementId, blogId) => {
    try {
        // 添加加载状态检查
        if (!window.twikoo) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = commentConfig.scriptUrl;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // 添加错误边界
        if (typeof twikoo?.init !== 'function') {
            throw new Error('Twikoo 初始化方法不可用');
        }

        // 初始化配置
        twikoo.init({
            envId: commentConfig.apiEndpoint,
            el: `#${elementId}`,
            path: String(blogId).trim() || location.pathname
        });

        // 返回清理方法
        return () => {
            const container = document.getElementById(elementId);
            if (container) container.innerHTML = '';
        };
    } catch (err) {
        console.error('[评论系统] 初始化失败:', err);
        throw err;
    }
};