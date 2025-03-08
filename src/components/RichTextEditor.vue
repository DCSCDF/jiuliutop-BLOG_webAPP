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
import hljs from 'highlight.js'; // 引入 highlight.js
import javascript from 'highlight.js/lib/languages/javascript'; // 引入 JavaScript 语言支持

// 注册 JavaScript 语言
hljs.registerLanguage('javascript', javascript);

// 声明必要变量
const server_url = inject('server_url');
const mode = ref('default'); // 使用默认模式
const editorRef = shallowRef();
const valueHtml = ref('');
const toolbarConfig = { excludeKeys: ['uploadVideo'] };
const editorConfig = { placeholder: '请输入内容...' };
import { AdminStore } from '../stores/AdminStore';
import axios from 'axios';
const adminStore = AdminStore();
// handleCreated 方法
const handleCreated = (editor) => {
    editorRef.value = editor;
    nextTick(() => {
        if (props.modelValue) {
            editor.setHtml(props.modelValue); // 使用编辑器 API 设置内容
            valueHtml.value = props.modelValue; // 同步数据
        }
    });
};
// 配置代码高亮
editorConfig.MENU_CONF = {
    highlight: {
        hljs, // 传入 highlight.js 实例
        languages: ['javascript'], // 启用 JavaScript 语言支持
    },
};

// 配置图片上传
editorConfig.MENU_CONF['uploadImage'] = {
    // 新增 headers 配置
    headers: {
        Authorization: `Bearer ${adminStore.token}`
    },
    base64LimitSize: 10 * 1024, // 10kb
    maxFileSize: 50 * 1024 * 1024, // 5MB
    // 自定义上传方法 (推荐)
    customUpload: async (file, insertImage) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/upload/rich_editor_upload', formData, {
                headers: {
                    'Authorization': `Bearer ${adminStore.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.errno === 0) {
                insertImage(res.data.data.url);
            } else {
                console.error('上传失败:', res.data.message);
            }
        } catch (err) {
            console.error('上传异常:', err);
        }
    }


};

editorConfig.MENU_CONF['insertImage'] = {
    parseImageSrc: (src) => {
        if (src.indexOf('http') !== 0) {
            return `${server_url}${src}`;
        }
        return src;
    },
};

// 声明 props 和 emits
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:model-value']); // 声明事件

// 生命周期
onMounted(() => {
    highlightCode(); // 高亮代码块
    if (editorRef.value) {
        editorRef.value.setHtml(props.modelValue); // 初始化内容
    }
});

onBeforeUnmount(() => {
    if (editorRef.value) {
        editorRef.value.destroy(); // 销毁编辑器实例
    }
});



// 监听 props 变化
watch(
    () => props.modelValue,
    (newVal) => {
        if (editorRef.value && newVal) {
            editorRef.value.setHtml(newVal); // 更新编辑器内容
            valueHtml.value = newVal;
        }
    }
);

// handleChange 方法
const handleChange = () => {
    emit('update:model-value', valueHtml.value); // 触发事件
};

// 异步高亮代码块
const highlightCode = () => {
    setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }, 0);
};

// 返回必要数据
defineExpose({
    destroyEditor: () => editorRef.value?.destroy(),
    initEditor: () => handleCreated(editorRef.value),
    mode,
    editorRef,
    valueHtml,
    toolbarConfig,
    editorConfig,
});
</script>