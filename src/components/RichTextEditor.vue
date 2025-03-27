<template>
    <div style="border: 1px solid #ccc; margin-top: 10px; border-radius: 8px;">
        <div style="margin: 10px">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
                style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml"
                style="height: 400px; overflow-y: hidden" @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, shallowRef, onBeforeUnmount, inject, nextTick, watch, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import Compressor from 'compressorjs';
// 统一配置
const LSKY_CONFIG = {
    baseUrl: 'https://img.jiuliu.top/api/v1',
    email: '3209174373@qq.com',
    password: 'q1012414217'
}

// 初始化
hljs.registerLanguage('javascript', javascript);
const server_url = inject('server_url');
const mode = ref('default');
const editorRef = shallowRef();
const valueHtml = ref('');
const toolbarConfig = { excludeKeys: ['uploadVideo'] };
const editorConfig = { placeholder: '请输入内容...' };
// import { AdminStore } from '../stores/AdminStore';
import axios from 'axios';
// const adminStore = AdminStore();

// 获取兰空Token
let tokenCache = null; // Token缓存

// 获取Token（带缓存和重试）
const getLskyToken = async () => {
    if (tokenCache) return tokenCache;

    try {
        const res = await axios.post(`${LSKY_CONFIG.baseUrl}/tokens`, {
            email: LSKY_CONFIG.email,
            password: LSKY_CONFIG.password
        }, {
            headers: { 'Accept': 'application/json' },
            timeout: 5000
        });

        tokenCache = res.data.data.token;
        setTimeout(() => tokenCache = null, 60 * 60 * 1000); // 1小时过期
        return tokenCache;
    } catch (e) {
        console.error('Token获取失败:', e.response?.data || e.message);
        throw new Error('图片服务认证失败');
    }
}

// 编辑器配置
editorConfig.MENU_CONF = {
    highlight: {
        hljs,
        languages: ['javascript'],
    },
    uploadImage: {
        maxFileSize: 100 * 1024 * 1024, // 原始文件大小限制（可保留或调整）
        customUpload: async (file, insertImage) => {
            try {
                // 0. 使用compressorjs压缩图片（新增）
                const compressedFile = await new Promise((resolve, reject) => {
                    new Compressor(file, {
                        quality: 0.9,          // 推荐初始压缩质量
                        maxWidth: 2560,        // 限制最大宽度
                        maxHeight: 1440,       // 限制最大高度
                        convertSize: 1 * 1024 * 1024, // 超过1MB的图片才压缩
                        success(result) {
                            resolve(new File([result], file.name, { type: file.type }));
                        },
                        error(err) {
                            reject(new Error(`图片压缩失败: ${err.message}`));
                        }
                    });
                });

                // 1. 获取Token（带重试机制）
                let token = await getLskyToken();
                if (!token) {
                    console.error('获取Token失败，尝试重新获取...');
                    token = await getLskyToken();
                    if (!token) throw new Error('无法获取有效Token');
                }

                // 2. 准备上传压缩后的文件
                const formData = new FormData();
                formData.append('file', compressedFile); // 使用压缩后的文件

                // 3. 执行上传
                const res = await axios.post(`${LSKY_CONFIG.baseUrl}/upload`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 10000
                });

                // 4. 处理结果（保持不变）
                if (res.data?.status) {
                    if (res.data?.data?.links?.url) {
                        insertImage(res.data.data.links.url);
                    } else {
                        throw new Error('上传成功但返回的URL无效');
                    }
                } else {
                    throw new Error(res.data?.message || '上传被服务器拒绝');
                }
            } catch (error) {
                // message.error(error.message) 
                console.error('上传失败详情:', error)
                throw error
            }
        }
    },
    insertImage: {
        parseImageSrc: (src) => {
            if (src.indexOf('http') !== 0) {
                return `${server_url}${src}`
            }
            return src
        },
    }
}


// 组件逻辑
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:model-value'])

const handleCreated = (editor) => {
    editorRef.value = editor
    nextTick(() => {
        if (props.modelValue) {
            editor.setHtml(props.modelValue)
            valueHtml.value = props.modelValue
        }
    })
}

const handleChange = () => {
    emit('update:model-value', valueHtml.value)
}

const highlightCode = () => {
    setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, 0)
}

onMounted(() => {
    highlightCode()
    if (editorRef.value) {
        editorRef.value.setHtml(props.modelValue)
    }
})

onBeforeUnmount(() => {
    if (editorRef.value) {
        editorRef.value.destroy()
    }
})

watch(
    () => props.modelValue,
    (newVal) => {
        if (editorRef.value && newVal) {
            editorRef.value.setHtml(newVal)
            valueHtml.value = newVal
        }
    }
)

defineExpose({
    destroyEditor: () => editorRef.value?.destroy(),
    initEditor: () => handleCreated(editorRef.value),
    mode,
    editorRef,
    valueHtml,
    toolbarConfig,
    editorConfig,
})
</script>