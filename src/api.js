// 评论组件的js
const commentscripturl = "https://cdn.jsdelivr.net/npm/twikoo@1.6.7/dist/twikoo.all.min.js"
// 评论API地址
const commentapi = "https://discuss.jiuliu.top/"
//后端API地址
const APIURL = "https://api.jiuliu.top"


export const API = {
    //后端地址
    Url: APIURL
}
export const commentConfig = {
    scriptUrl: commentscripturl,
    apiEndpoint: commentapi
}
export const setupComment = (elementId, blogId) => {
    // 动态加载twikoo CDN
    const loadTwikoo = () => new Promise((resolve, reject) => {
        if (window.twikoo) return resolve();

        const script = document.createElement('script');
        script.src = commentscripturl;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    // 初始化评论
    const init = async () => {
        try {
            await loadTwikoo();
            twikoo.init({
                envId: commentapi,
                el: `#${elementId}`,
                region: "ap-shanghai",
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
            region: "ap-shanghai",
            path: String(blogId).trim() || location.pathname
        });

        // 返回清理方法
        return () => {
            const container = document.getElementById(elementId);
            if (container) container.innerHTML = '';
        };
    } catch (err) {
        console.error('[评论系统] 初始化失败:', err);
        throw err; // 抛出错误供外部处理
    }
};