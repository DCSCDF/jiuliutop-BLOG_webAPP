<template>
    <n-modal v-model:show="showDeleteModal" preset="dialog" title="确认删除" type="error" content="确定要删除这篇文章吗？"
        positive-text="确认" negative-text="取消" @positive-click="confirmDelete" />
    <div class="w-full bg-white rounded-lg">
        <n-config-provider :theme-overrides="themeOverrides">
            <n-card>
                <n-tabs v-model:value="tabValue" type="line" animated :destroy-on-hide="false">
                    <n-tab-pane name="list" tab="文章列表">
                        <div v-for="(blog, index) in blogListInfo">
                            <n-card :title="blog.title" class="my-4 ">
                                <div>
                                    <p>{{ blog.content }}</p>
                                </div>
                                <template #footer>
                                    <n-space justify="space-between" align="center">
                                        <div>发布时间：{{ blog.create_time }}</div>
                                        <div class="flex gap-2">
                                            <!-- 中添加删除确认弹窗 -->
                                            <n-button
                                                @click="showDeleteModal = true; currentDeleteBlog = blog">删除</n-button>
                                            <n-button @click="toUpdate(blog)">修改</n-button>
                                        </div>
                                    </n-space>
                                </template>
                            </n-card>
                        </div>
                        <n-space justify="center" class="my-5">
                            <n-button v-for="pageNum in pageInfo.pageCount" :key="pageNum"
                                :type="pageNum === pageInfo.page ? 'primary' : 'default'" size="small"
                                @click="toPage(pageNum)">
                                {{ pageNum }}
                            </n-button>
                        </n-space>
                    </n-tab-pane>

                    <n-tab-pane name="add" tab="添加文章">
                        <n-form class="mt-10">
                            <n-form-item label="标题：" class="max-w-80">
                                <n-input v-model:value="addArticle.title" placeholder="输入标题" />
                            </n-form-item>
                            <n-form-item label="分类：" class="max-w-80">
                                <n-select v-model:value="addArticle.categoryId" placeholder="选择分类"
                                    :options="categoryOptions" />
                            </n-form-item>

                            <!-- 添加上传图片的按钮 -->
                            <n-upload ref="uploadRef" :action="uploadUrl" :headers="uploadHeaders"
                                @finish="handleUploadFinish" :max="1" @exceed="handleExceed"
                                :before-upload="beforeUpload" accept="image/*">
                                <n-button>上传图片</n-button>
                            </n-upload>

                            <n-form-item label="正文：">
                                <RichTextEditor class="rich-editor-container" v-model="addArticle.content" />
                            </n-form-item>
                            <!-- 在模板中添加确认弹窗 -->
                            <n-modal v-model:show="showConfirm" preset="dialog" title="确认提交" content="确定要提交这篇文章吗？"
                                positive-text="确认" negative-text="取消" @positive-click="handleConfirmSubmit" />

                            <!-- 修改提交按钮事件 -->
                            <n-button @click="showConfirm = true" style="margin-bottom:20px;" color="#6b7281"
                                :disabled="!addArticle.title.trim() || !addArticle.content">
                                提交文章
                            </n-button>

                        </n-form>
                    </n-tab-pane>
                    <n-tab-pane name="update" tab="修改文章">
                        <n-form class="mt-10">
                            <n-form-item label="修改标题：" class="max-w-80">
                                <n-input v-model:value="updateArticle.title" placeholder="输入标题" />
                            </n-form-item>
                            <n-form-item label="修改分类：" class="max-w-80">
                                <n-select v-model:value="updateArticle.categoryId" placeholder="选择分类"
                                    :options="categoryOptions" />
                            </n-form-item>

                            <!-- 添加修改图片的上传组件 -->
                            <n-form-item label="修改首页图片：">
                                <div class="w-2xl flex flex-row flex-wrap">
                                    <n-upload :action="uploadUrl" :headers="uploadHeaders"
                                        @finish="handleUpdateUploadFinish" :max="1" @exceed="handleExceed"
                                        :before-upload="beforeUpload" accept="image/*">
                                        <n-button>更换图片</n-button>
                                    </n-upload>

                                    <div v-if="updateArticle.img_url" class="mt-2">
                                        当前图片：<img :src="updateArticle.img_url"
                                            class="max-w-80 h-40 object-cover rounded-md mx-4" />
                                    </div>
                                </div>
                            </n-form-item>
                            <n-form-item label="修改文章：">
                                <RichTextEditor v-model="updateArticle.content" ref="richTextEditorRef" />
                            </n-form-item>
                            <!-- 在模板中添加确认弹窗 -->
                            <n-modal v-model:show="showUpdateModal" preset="dialog" title="确认修改" content="确定要修改这篇文章吗？"
                                positive-text="确认" negative-text="取消" @positive-click="updateSubmit" />
                            <!-- 修改修改按钮事件 -->
                            <n-button @click="showUpdateModal = true" color="#6b7281"
                                :disabled="!updateArticle.id || !updateArticle.title.trim() || !updateArticle.content">
                                修改文章
                            </n-button>

                        </n-form>
                        <!-- {{ updateArticle.content }} -->
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </n-config-provider>

        <!-- {{ addArticle.content }} -->
    </div>
</template>
<script setup>

import RichTextEditor from '../../components/RichTextEditor.vue';
import { NForm, NButton, NFormItem, NInput, NSelect, useMessage, NCard, NSpace, NUpload } from 'naive-ui';
import themeOverrides from '../../themeOverrides';
import { ref, reactive, onMounted, inject, nextTick, shallowRef, watch } from "vue";
import { AdminStore } from '../../stores/AdminStore';
import Category from './Category.vue';
import axios from 'axios';
// 创建上传请求头（响应式）
const adminStore = AdminStore();
const uploadHeaders = ref({
    Authorization: `Bearer ${adminStore.token}`
});
/* console.log('当前Token:', adminStore.token); */
// 监听 token 变化更新请求头
watch(() => adminStore.token, (newToken) => {
    uploadHeaders.value.Authorization = `Bearer ${newToken}`;
});
// 添加beforeUpload校验函数
const beforeUpload = ({ file }) => {
    // 允许的图片类型
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp'
    ];

    // 校验文件类型
    if (!allowedTypes.includes(file.type)) {
        message.error('只能上传图片文件（JPEG/PNG/GIF/WEBP/BMP）');
        return false;
    }

    // 可选：校验文件大小（例如限制5MB）
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.file.size > maxSize) {
        message.error('图片大小不能超过20MB');
        return false;
    }

    return true;
};

let uploadUrl = axios.defaults.baseURL + '/upload/rich_editor_upload'
const showDeleteModal = ref(false);
const currentDeleteBlog = ref(null);
const tabValue = ref("add")

const message = useMessage() // 在setup顶部声明
const handleExceed = () => {
    message.error("只能上传一张图片！");
};

const addArticle = reactive({
    categoryId: null,
    title: "",
    content: "",
    img_url: null
})

const updateArticle = reactive({
    id: 0,
    categoryId: null,
    title: "",
    content: "",
    img_url: null
})

const categoryOptions = ref([])
const blogListInfo = ref([])

const pageInfo = reactive({
    page: 1,
    pageSize: 6,
    pageCount: 0,
    count: 0
})
/* console.log(pageInfo.page) */

onMounted(() => {
    loadCategorys()
    loadBlogs()
})

const loadBlogs = async () => {
    let res = await axios.get(`/blog/search`, {
        params: {
            page: pageInfo.page,
            pageSize: pageInfo.pageSize
        }
    })
    let temp_rows = res.data.data.rows
    pageInfo.count = res.data.data.count;
    // 除完取整 比较加1
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    blogListInfo.value = temp_rows
    for (let row of temp_rows) {
        row.content += ' ...'
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
}

const loadCategorys = async () => {
    let res = await axios.get("/category/list");
    // 添加值为null的空选项
    categoryOptions.value = [
        { label: "无分类(空)", value: null }, // 新增空选项
        ...res.data.data.map((item) => ({
            label: item.name,
            value: item.id
        }))
    ];
    /* console.log(categoryOptions.value) */ //查看分类数组 
}

const showConfirm = ref(false)
const handleUploadFinish = (options) => {
    try {
        console.log('完整上传事件参数:', options); // 调试关键

        // 1. 从事件参数中直接提取响应数据
        const { file, event } = options; // 解构参数

        // 2. 从 XMLHttpRequest 对象获取响应
        const responseText = event?.target?.responseText;
        if (!responseText) {
            throw new Error('服务器响应数据为空');
        }

        // 3. 手动解析 JSON
        const responseData = JSON.parse(responseText);
        console.log('解析后的响应数据:', responseData);

        // 4. 验证数据结构
        if (typeof responseData.errno !== 'number' || !responseData.data?.url) {
            throw new Error('服务器响应结构异常');
        }

        // 5. 处理成功逻辑
        if (responseData.errno === 0) {
            addArticle.img_url = responseData.data.url;
            message.success("图片上传成功！");
            console.log('图片路径已更新:', addArticle.img_url);
        } else {
            message.error(`上传失败，错误码: ${responseData.errno}`);
        }
    } catch (error) {
        console.error('上传处理失败:', error);
        message.error(error.message || "图片上传处理异常");
    }
    return file;
};

const uploadRef = ref(null); // 声明 uploadRef
const handleConfirmSubmit = async () => {
    try {
        const postData = {
            categoryId: addArticle.categoryId || null,
            title: addArticle.title,
            content: addArticle.content,
            img_url: addArticle.img_url,
        };

        const res = await axios.post('/blog/_token/add', postData);

        if (res.data.code === 200) {
            message.success('提交成功！');

            // === 新增核心代码 ===
            pageInfo.page = 1; // 重置到第一页
            await loadBlogs(); // 强制刷新列表
            await nextTick();  // 等待数据加载完成
            // ==================

            // 清空表单
            addArticle.title = '';
            addArticle.content = '';
            addArticle.categoryId = null;
            addArticle.img_url = null;

            if (uploadRef.value) {
                uploadRef.value.clear();
            }

            // 延迟切换确保DOM更新
            setTimeout(() => {
                tabValue.value = 'list';
            }, 50);
        }
    } catch (error) {
        console.error('提交失败:', error);
        message.error('服务器异常');
    }
};
const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()
}
const showUpdateModal = ref(false); // 控制修改弹窗的显示状态
const update = ref(false) // 控制修改弹窗显示状态

/* 
留着检查用 请勿启用
const toUpdate = async (blog) => {
    try {
        tabValue.value = "update";
        const res = await axios.get("/blog/detail?id=" + blog.id);
        if (res.data.code === 200) {
        } else {
            message.error("获取文章失败");
            updateArticle.id = null; // 重置ID
        }
    } catch (error) {
        updateArticle.id = null; // 异常时重置ID
        message.error("服务器异常");
    }
}
 */
const handleUpdateUploadFinish = (options) => {
    try {
        console.log('修改图片上传事件参数:', options);

        // 1. 解构事件参数
        const { file, event } = options;

        // 2. 获取原生响应数据
        const responseText = event?.target?.responseText;
        if (!responseText) {
            throw new Error('服务器未返回响应内容');
        }

        // 3. 解析JSON数据
        const responseData = JSON.parse(responseText);
        console.log('修改图片响应数据:', responseData);

        // 4. 验证数据结构
        if (typeof responseData.errno !== 'number' || !responseData.data?.url) {
            throw new Error(`无效的响应结构: ${JSON.stringify(responseData)}`);
        }

        // 5. 处理业务逻辑
        if (responseData.errno === 0) {
            updateArticle.img_url = responseData.data.url;
            message.success("封面图更新成功！");
            console.log('新封面URL:', updateArticle.img_url);
        } else {
            message.error(`封面更新失败 CODE: ${responseData.errno}`);
        }
    } catch (error) {
        console.error('封面更新失败:', error);
        message.error(`封面图处理失败: ${error.message}`);
    }
    return file;
};

// 新增对tabValue的监听
watch(tabValue, (newVal) => {
    if (newVal === "update") {
        if (!updateArticle.id) {
            message.error("未选择有效文章");
            // 可能需要延迟切换回列表，避免直接修改tabValue导致的问题
            setTimeout(() => {
                tabValue.value = "list";
            }, 0);
        }
    }
});

/* const toUpdate = async (blog) => {
  // ...其他代码
  tabValue.value = "update";
  await nextTick();

  }
} */

// 修改获取文章详情的函数
const toUpdate = async (blog) => {
    try {
        if (!blog?.id) {
            message.error("无效的文章ID");
            return;
        }

        const res = await axios.get("/blog/detail?id=" + blog.id);
        if (res.data.code === 200) {
            // 先赋值数据
            Object.assign(updateArticle, {
                id: blog.id,
                title: res.data.data.title,
                content: res.data.data.content,
                categoryId: res.data.data.category_id,
                img_url: res.data.data.img_url
            });
            await nextTick(); // 等待DOM更新
            // 数据赋值完成后再切换标签页
            tabValue.value = "update";

            await nextTick();

        } else {
            message.error("获取文章失败");
        }
    } catch (error) {
        console.error('获取详情失败:', error);
        message.error("服务器异常");
    }
};

// 修改提交函数
const updateSubmit = async () => {
    if (!updateArticle.id) {
        message.error("无效的文章ID")
        return
    }
    try {
        const postData = {
            id: updateArticle.id,
            categoryId: updateArticle.categoryId || null,
            title: updateArticle.title.trim(),
            content: updateArticle.content,
            img_url: updateArticle.img_url  // 新增图片路径参数
        }

        const res = await axios.put("/blog/_token/update", postData);
        if (res.data.code === 200) {
            message.success("修改成功！");
            tabValue.value = "list"
            update.value = false;
            loadBlogs();
        }
    } catch (error) {
        console.error('修改失败:', error);
        message.error("服务器异常");
    }
}
const confirmDelete = async () => {
    try {
        if (!currentDeleteBlog.value?.id) {
            message.error("无效的文章ID");
            return;
        }

        const res = await axios.delete("/blog/_token/delete?id=" + currentDeleteBlog.value.id);
        if (res.data.code === 200) {
            message.success("删除成功");
            loadBlogs(); // 刷新文章列表
            currentDeleteBlog.value = null;
        } else {
            message.error("删除失败");
        }
    } catch (error) {
        console.error('删除失败:', error);
        message.error("服务器异常");
    }
}


</script>
<style scoped>
.card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
}

:deep(.n-card) {
    border-radius: 0.5rem;
    /* 对应rounded-lg */
}

/* 添加全局全屏样式 */
:deep(.rich-editor-container .w-e-full-screen-container) {
    z-index: 9999 !important;
    /* 置顶优先级 */
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
}

/* 如果使用wangEditor */
:deep(.w-e-full-screen-container) {
    z-index: 9999 !important;
}

/* 如果使用其他编辑器（如Quill） */
:deep(.ql-container.ql-full-screen) {
    z-index: 9999 !important;
}

/* 在父组件样式表中添加 */
:deep(.rich-editor-container .w-e-bar-item button) {
    opacity: 1 !important;
    cursor: pointer !important;
}
</style>