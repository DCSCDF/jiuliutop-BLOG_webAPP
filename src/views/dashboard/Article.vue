<template>
    <div class="w-full bg-white rounded-lg">
        <n-config-provider :theme-overrides="themeOverrides">
            <n-card>
                <n-tabs v-model:value="tabValue" type="line" animated :destroy-on-hide="false">
                    <n-tab-pane name="list" tab="文章列表">

                        <n-modal v-model:show="showDeleteModal" preset="dialog" title="确认删除" type="error"
                            content="确定要删除这篇文章吗？" positive-text="确认" negative-text="取消"
                            @positive-click="confirmDelete" />

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
                            <!-- 上传时隐藏表单内容 -->
                            <div v-if="!uploading">
                                <n-form-item label="标题：" class="max-w-80">
                                    <n-input v-model:value="addArticle.title" placeholder="输入标题" />
                                </n-form-item>
                                <n-form-item label="分类：" class="max-w-80">
                                    <n-select v-model:value="addArticle.categoryId" placeholder="选择分类"
                                        :options="categoryOptions" />
                                </n-form-item>

                                <n-form-item label="文章封面：">
                                    <div class="flex flex-col w-full gap-0">
                                        <n-upload class="full-cover-upload" :action="uploadUrl" :headers="uploadHeaders"
                                            :max="1" @change="handleFileSelection" @remove="handleUploadRemove"
                                            @exceed="handleExceed" :before-upload="beforeUpload" accept="image/*"
                                            list-type="image-card" :file-list="fileList" :show-preview-button="true"
                                            :show-remove-button="true" :default-upload="false">
                                            <template #default>
                                                选择图片
                                            </template>
                                        </n-upload>
                                    </div>
                                </n-form-item>

                                <n-form-item label="正文：">
                                    <RichTextEditor class="rich-editor-container" v-model="addArticle.content" />
                                </n-form-item>
                            </div>

                            <n-modal v-model:show="showConfirm" preset="dialog" title="确认提交"
                                :positive-text="isSubmitting ? '提交中...' : '确认'" negative-text="取消"
                                @positive-click="handleConfirmSubmit"
                                :positive-button-props="{ loading: isSubmitting, disabled: isSubmitting }"
                                @after-leave="resetSubmitState">
                                <template #header>
                                    <div>确定要提交这篇文章吗？</div>
                                </template>
                                <!-- 上传进度显示（仅在上传时显示） -->
                                <div class="my-6">
                                    <div v-if="uploading" class="text-center">
                                        <n-progress :percentage="uploadProgress" />
                                    </div>
                                    <div v-if="isSubmitting" class="flex items-center gap-2">
                                        <span>正在提交，请稍候...</span>
                                    </div>
                                </div>
                            </n-modal>
                            <n-button @click="showConfirm = true" style="margin-bottom:20px;" color="#6b7281"
                                :disabled="!addArticle.title.trim() || !addArticle.content || uploading">
                                提交文章
                            </n-button>
                        </n-form>
                    </n-tab-pane>


                    <n-tab-pane name="update" tab="修改文章">
                        <div v-if="!updateArticle.id" class="text-center py-10">
                            <n-result status="404" title="文章未获取" description="请从文章列表中选择要修改的文章">
                                <template #footer>
                                    <n-button @click="tabValue = 'list'">返回文章列表</n-button>
                                </template>
                            </n-result>
                        </div>

                        <n-form v-else class="mt-10">
                            <!-- 上传时隐藏表单内容 -->
                            <div v-if="!updateUploading">
                                <n-form-item label="修改标题：" class="max-w-80">
                                    <n-input v-model:value="updateArticle.title" placeholder="输入标题" />
                                </n-form-item>
                                <n-form-item label="修改分类：" class="max-w-80">
                                    <n-select v-model:value="updateArticle.categoryId" placeholder="选择分类"
                                        :options="categoryOptions" />
                                </n-form-item>

                                <n-form-item label="修改文章封面：">
                                    <div class="flex flex-col w-full gap-0">
                                        <n-upload class="full-cover-upload" :action="uploadUrl" :headers="uploadHeaders"
                                            :max="1" @change="handleUpdateFileSelection"
                                            @remove="handleUpdateUploadRemove" @exceed="handleExceed"
                                            :before-upload="beforeUpload" accept="image/*" list-type="image-card"
                                            :file-list="updateFileList" :show-preview-button="true"
                                            :show-remove-button="true" :default-upload="false">
                                            <template #default>
                                                选择图片
                                            </template>
                                        </n-upload>
                                    </div>
                                </n-form-item>

                                <n-form-item label="修改正文：">
                                    <RichTextEditor class="rich-editor-container" v-model="updateArticle.content" />
                                </n-form-item>
                            </div>

                            <n-modal v-model:show="showUpdateConfirm" preset="dialog" title="确认修改"
                                :positive-text="isUpdating ? '提交中...' : '确认'" negative-text="取消"
                                @positive-click="handleConfirmUpdate"
                                :positive-button-props="{ loading: isUpdating, disabled: isUpdating }"
                                @after-leave="resetUpdateState">
                                <template #header>
                                    <div>确定要修改这篇文章吗？</div>
                                </template>
                                <!-- 上传进度显示（仅在上传时显示） -->
                                <div class="my-6">
                                    <div v-if="updateUploading" class="text-center">
                                        <n-progress :percentage="updateProgress" />
                                    </div>
                                    <div v-if="isUpdating" class="flex items-center gap-2">
                                        <span>正在提交修改，请稍候...</span>
                                    </div>
                                </div>
                            </n-modal>
                            <n-button @click="showUpdateConfirm = true" style="margin-bottom:20px;" color="#6b7281"
                                :disabled="!updateArticle.title.trim() || !updateArticle.content || updateUploading">
                                修改文章
                            </n-button>
                        </n-form>
                    </n-tab-pane>


                </n-tabs>
            </n-card>
        </n-config-provider>

        <!-- {{ addArticle.content }} -->
    </div>
</template>
<script setup>
import { useMessage, NButton, NForm, NFormItem, NInput } from 'naive-ui';
import RichTextEditor from '../../components/RichTextEditor.vue';
import themeOverrides from '../../themeOverrides';
import { ref, reactive, onMounted, inject, nextTick, shallowRef, watch } from "vue";
import { AdminStore } from '../../stores/AdminStore';
import axios from 'axios';

// 文件列表响应式变量
const fileList = ref([]);
const updateFileList = ref([]);

const uploading = ref(false);
const updateUploading = ref(false);
const uploadProgress = ref(0);
const updateProgress = ref(0);
const uploadController = ref(null); // 用于取消上传

// 创建上传请求头（响应式）
const adminStore = AdminStore();
const uploadHeaders = ref({
    Authorization: `Bearer ${adminStore.token}`
});

// 监听 token 变化更新请求头
watch(() => adminStore.token, (newToken) => {
    uploadHeaders.value.Authorization = `Bearer ${newToken}`;
});

// beforeUpload校验函数
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

const message = useMessage()
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
}

// 文章的文件选择处理函数
const handleFileSelection = (data) => {
    const { file, fileList: newFileList } = data;
    fileList.value = newFileList;

    // 仅更新文件列表，暂不上传
    if (file.status === 'pending') {
        file.status = 'waiting'; // 自定义状态表示尚未上传
    }
};

// 修改文章的文件选择处理函数
const handleUpdateFileSelection = (data) => {
    const { file, fileList: newFileList } = data;
    updateFileList.value = newFileList;

    // 仅更新文件列表，暂不上传
    if (file.status === 'pending') {
        file.status = 'waiting'; // 自定义状态表示尚未上传
    }
};

const showConfirm = ref(false)
const showUpdateConfirm = ref(false)

// 文章的图片移除处理
const handleUploadRemove = () => {
    // 如果正在上传，取消上传
    if (uploadController.value) {
        uploadController.value.abort();
    }

    addArticle.img_url = null;
    fileList.value = [];
    uploading.value = false;
    uploadProgress.value = 0;
    message.info("已移除图片");
};

// 修改文章的图片移除处理
const handleUpdateUploadRemove = async () => {
    try {
        // 如果正在上传，取消上传
        if (uploadController.value) {
            uploadController.value.abort();
        }

        // 如果有旧图片URL，提取文件名并调用删除API
        if (updateArticle.img_url) {
            // 从URL中提取文件名
            const urlParts = updateArticle.img_url.split('/');
            const filename = urlParts[urlParts.length - 1];
            console.log(filename)
            // 调用删除API
            const res = await axios.delete(`/upload/delete/${filename}`, {
                headers: uploadHeaders.value
            });

            if (res.data.errno === 0) {
                message.success("服务器图片删除成功");
            } else {
                message.warning("服务器图片删除失败: " + res.data.message);
            }
        }

        // 重置本地状态
        updateArticle.img_url = null;
        updateFileList.value = [];
        updateUploading.value = false;
        updateProgress.value = 0;
        message.info("已移除图片");
    } catch (error) {
        console.error('删除图片失败:', error);
        message.error("删除图片时发生错误");
    }
};

// 提交状态变量
const isSubmitting = ref(false);
const isUpdating = ref(false);

// 文章确认提交处理函数
const handleConfirmSubmit = async () => {
    // 防止重复提交
    if (isSubmitting.value) return;

    try {
        isSubmitting.value = true;
        uploading.value = true;
        uploadProgress.value = 0;

        // 1. 先上传图片（如果有）
        if (fileList.value.length > 0 && fileList.value[0].status !== 'finished') {
            const file = fileList.value[0];

            const formData = new FormData();
            formData.append('file', file.file);

            const uploadResponse = await axios.post(uploadUrl, formData, {
                headers: {
                    ...uploadHeaders.value,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        uploadProgress.value = Math.round(
                            (progressEvent.loaded * 50) / progressEvent.total
                        );
                    }
                }
            });

            if (uploadResponse.data.errno === 0) {
                addArticle.img_url = uploadResponse.data.data.url;
                file.status = 'finished';
                file.url = uploadResponse.data.data.url;
            } else {
                throw new Error(uploadResponse.data.message || '图片上传失败');
            }
        }

        uploadProgress.value = 75;

        // 提交文章数据
        const postData = {
            categoryId: addArticle.categoryId || null,
            title: addArticle.title,
            content: addArticle.content,
            img_url: addArticle.img_url || null,
        };

        const res = await axios.post('/blog/_token/add', postData);

        if (res.data.code === 200) {
            uploadProgress.value = 100;
            message.success('提交成功！');
            resetAddForm();
            tabValue.value = "list";
            loadBlogs();
        } else {
            throw new Error(res.data.message || '文章提交失败');
        }
    } catch (error) {
        console.error('提交失败:', error);
        message.error(error.message || '服务器异常');
    } finally {
        // 立即关闭弹窗
        showConfirm.value = false;
        // 延迟重置状态以避免UI闪烁
        setTimeout(() => {
            isSubmitting.value = false;
            uploading.value = false;
            uploadProgress.value = 0;
        }, 300);
    }
};

// 修改文章确认提交处理函数
const handleConfirmUpdate = async () => {
    // 防止重复提交
    if (isUpdating.value) return;

    try {
        isUpdating.value = true;
        updateUploading.value = true;
        updateProgress.value = 0;

        // 先上传图片（如果有）
        if (updateFileList.value.length > 0 && updateFileList.value[0].status !== 'finished') {
            const file = updateFileList.value[0];

            const formData = new FormData();
            formData.append('file', file.file);

            const uploadResponse = await axios.post(uploadUrl, formData, {
                headers: {
                    ...uploadHeaders.value,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        updateProgress.value = Math.round(
                            (progressEvent.loaded * 50) / progressEvent.total
                        );
                    }
                }
            });

            if (uploadResponse.data.errno === 0) {
                updateArticle.img_url = uploadResponse.data.data.url;
                file.status = 'finished';
                file.url = uploadResponse.data.data.url;
            } else {
                throw new Error(uploadResponse.data.message || '图片上传失败');
            }
        }

        updateProgress.value = 75;

        // 提交文章数据
        const postData = {
            id: updateArticle.id,
            categoryId: updateArticle.categoryId || null,
            title: updateArticle.title,
            content: updateArticle.content,
            img_url: updateArticle.img_url || null,
        };

        const res = await axios.put('/blog/_token/update', postData);

        if (res.data.code === 200) {
            updateProgress.value = 100;
            message.success('修改成功！');
            resetUpdateForm();
            tabValue.value = "list";
            loadBlogs();
        } else {
            throw new Error(res.data.message || '文章修改失败');
        }
    } catch (error) {
        console.error('修改失败:', error);
        message.error(error.message || '服务器异常');
    } finally {
        // 立即关闭弹窗
        showUpdateConfirm.value = false;
        // 延迟重置状态以避免UI闪烁
        setTimeout(() => {
            isUpdating.value = false;
            updateUploading.value = false;
            updateProgress.value = 0;
        }, 300);
    }
};

const resetSubmitState = () => {
    isSubmitting.value = false;
    uploading.value = false;
    uploadProgress.value = 0;
};

const resetUpdateState = () => {
    isUpdating.value = false;
    updateUploading.value = false;
    updateProgress.value = 0;
};

// 重置表单函数
const resetAddForm = () => {
    addArticle.title = '';
    addArticle.content = '';
    addArticle.categoryId = null;
    addArticle.img_url = null;
    fileList.value = [];
};

// 修改文章重置表单函数
const resetUpdateForm = () => {
    updateArticle.id = 0;
    updateArticle.title = '';
    updateArticle.content = '';
    updateArticle.categoryId = null;
    updateArticle.img_url = null;
    updateFileList.value = [];
};

const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()
}

// 获取文章详情的函数
const toUpdate = async (blog) => {
    try {
        if (!blog?.id) {
            message.error("无效的文章ID");
            return;
        }

        const res = await axios.get("/blog/detail?id=" + blog.id);
        if (res.data.code === 200) {
            // 重置文件列表
            updateFileList.value = [];

            // 如果有封面图片，添加到文件列表
            if (res.data.data.img_url) {
                updateFileList.value = [{
                    id: 'current',
                    name: '当前封面',
                    status: 'finished',
                    url: res.data.data.img_url
                }];
            }

            // 赋值数据
            Object.assign(updateArticle, {
                id: blog.id,
                title: res.data.data.title,
                content: res.data.data.content,
                categoryId: res.data.data.category_id,
                img_url: res.data.data.img_url
            });

            // 数据赋值完成后再切换标签页
            tabValue.value = "update";
        } else {
            message.error("获取文章失败");
        }
    } catch (error) {
        console.error('获取详情失败:', error);
        message.error("服务器异常");
    }
};

const confirmDelete = async () => {
    try {
        if (!currentDeleteBlog.value?.id) {
            message.error("无效的文章ID");
            return;
        }

        // 先获取文章详情，检查是否有封面图片
        const detailRes = await axios.get("/blog/detail?id=" + currentDeleteBlog.value.id);
        if (detailRes.data.code !== 200) {
            message.error("获取文章详情失败");
            return;
        }

        const articleDetail = detailRes.data.data;

        // 如果有封面图片，先删除图片
        if (articleDetail.img_url) {
            // 从URL中提取文件名
            const urlParts = articleDetail.img_url.split('/');
            const filename = urlParts[urlParts.length - 1];

            // 调用删除图片API
            const deleteImgRes = await axios.delete(`/upload/delete/${filename}`, {
                headers: uploadHeaders.value
            });

            if (deleteImgRes.data.errno !== 0) {
                message.warning("封面图片删除失败: " + deleteImgRes.data.message);
                // 继续删除文章，不中断流程
            }
        }

        // 删除文章
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

.upload-preview {
    max-width: 100%;
    max-height: 200px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px dashed #d9d9d9;
}

:deep(.n-upload-file-list.n-upload-file-list--grid) {
    grid-template-columns: none !important;
}

/* 核心样式 - 完全填满且不变形 */
.full-cover-upload :deep(.n-upload-file-list) {
    min-width: 300px;
    width: 40% !important;
    margin: 0 !important;
    padding: 0 !important;
}

.full-cover-upload :deep(.n-upload-file--image-card-type) {
    min-width: 300px;
    height: 100% !important;
    margin: 0 !important;
    border: none !important;
    background: rgb(250, 250, 252);
}

.full-cover-upload :deep(.n-upload-file-info__thumbnail) {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
}

.full-cover-upload :deep(.n-image) {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
}

.full-cover-upload :deep(.n-image img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    /* 关键：保持比例不变形 */
    border-radius: 0 !important;
}

/* 操作按钮调整 */
.full-cover-upload :deep(.n-upload-file-info__action) {
    top: 8px;
    right: 8px;
}

/* 触发区域样式 */
.full-cover-upload :deep(.n-upload-trigger) {
    width: 100%;
    aspect-ratio: 16/9;
    /* 保持触发区域比例 */
}
</style>