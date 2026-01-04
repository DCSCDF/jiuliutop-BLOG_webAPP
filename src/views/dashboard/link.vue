<template>

    <div class="mx-auto">
        <div class="rounded-t-lg p-3 flex justify-between items-center">
            <div class="ml-5 md:ml-18 text-lg flex items-center text-gray-900">
                <span>链接列表</span>
            </div>
            <div class="mr-5 md:mr-18">
                <n-button class="min-w-[120px]" color="#6b7281" :theme-overrides="themeOverrides"
                    @click="showAddModal = true">
                    <template #icon>
                        <font-awesome-icon :icon="faPlus" />
                    </template>
                    添加链接
                </n-button>
            </div>
        </div>
        <div class="border-b dark:border-gray-700 border-gray-200"></div>
        <div class="p-5">
            <!-- 加载状态 -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <n-spin size="large" />
            </div>

            <!-- 链接列表 - 每行最多显示4个卡片 -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <div v-for="link in data" :key="link.id"
                    class="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col h-full">
                    <!-- 卡片内容区域，使用flex-grow让这部分占据剩余空间 -->
                    <div class="p-4 cursor-pointer flex-grow" @click="previewLink(link)">
                        <div v-if="link.img_url" class="h-40 mb-3 rounded overflow-hidden bg-gray-100">
                            <img :src="link.img_url" :alt="link.title" class="w-full h-full object-cover"
                                @error="handleImageError" />
                        </div>
                        <div class="px-2">
                            <h3 class="text-lg text-gray-800 font-semibold truncate">{{ link.title || "空" }}</h3>
                            <!-- 修改内容文本样式，限制2行显示，超出显示省略号 -->
                            <p
                                class="text-gray-500 text-sm line-clamp-2 mb-2 overflow-hidden text-ellipsis break-words">
                                {{ link.content || "空" }}
                            </p>
                            <p class="text-blue-500 text-xs truncate">{{ formatUrl(link.url) }}</p>
                        </div>
                    </div>

                    <!-- 操作按钮区域，固定在卡片底部 -->
                    <div class="flex justify-between p-3 border-t border-gray-200 bg-gray-50 mt-auto">
                        <n-button :theme-overrides="themeOverrides" size="small" secondary @click="openEditModal(link)">
                            <template #icon>
                                <font-awesome-icon :icon="faEdit" />
                            </template>
                            编辑
                        </n-button>
                        <n-button :theme-overrides="themeOverrides" size="small" secondary @click="deleteRow(link)"
                            type="error">
                            <template #icon>
                                <font-awesome-icon :icon="faTrash" />
                            </template>
                            删除
                        </n-button>
                    </div>
                </div>
            </div>

            <div v-if="!loading && data.length === 0" class="text-center py-12 text-gray-500">
                暂无链接，点击上方按钮添加
            </div>

            <!-- 添加链接模态框 -->
            <n-modal v-model:show="showAddModal" preset="card" title="添加链接" :bordered="false" size="medium"
                :style="modalStyle">
                <n-form ref="addFormRef" :model="addLink" :rules="formRules">
                    <n-form-item label="标题" path="title">
                        <n-input :theme-overrides="themeOverrides" v-model:value="addLink.title" placeholder="输入标题" />
                    </n-form-item>
                    <n-form-item label="内容" path="content">
                        <n-input :theme-overrides="themeOverrides" v-model:value="addLink.content" placeholder="输入内容" />
                    </n-form-item>
                    <n-form-item label="URL" path="url">
                        <n-input :theme-overrides="themeOverrides" v-model:value="addLink.url" placeholder="输入URL" />
                    </n-form-item>
                    <n-form-item label="图片URL">
                        <n-input :theme-overrides="themeOverrides" v-model:value="addLink.img_url"
                            placeholder="输入图片URL" />
                        <template #feedback>
                            <span class="text-xs text-gray-500">可选，建议尺寸 1200×630</span>
                        </template>
                    </n-form-item>
                </n-form>
                <template #action>
                    <n-space justify="end">
                        <n-button @click="showAddModal = false">取消</n-button>
                        <n-button type="primary" :loading="addingLink" :theme-overrides="themeOverrides"
                            @click="handleAdd">
                            确认添加
                        </n-button>
                    </n-space>
                </template>
            </n-modal>

            <!-- 编辑链接模态框 -->
            <n-modal v-model:show="showEditModal" preset="card" title="修改链接" :bordered="false" size="medium"
                :style="modalStyle">
                <n-form ref="editFormRef" :model="editLink" :rules="formRules">
                    <n-form-item label="标题" path="title">
                        <n-input :theme-overrides="themeOverrides" v-model:value="editLink.title" placeholder="输入标题" />
                    </n-form-item>
                    <n-form-item label="内容" path="content">
                        <n-input :theme-overrides="themeOverrides" v-model:value="editLink.content"
                            placeholder="输入内容" />
                    </n-form-item>
                    <n-form-item label="URL" path="url">
                        <n-input :theme-overrides="themeOverrides" v-model:value="editLink.url" placeholder="输入URL" />
                    </n-form-item>
                    <n-form-item label="图片URL">
                        <n-input :theme-overrides="themeOverrides" v-model:value="editLink.img_url"
                            placeholder="输入图片URL" />
                        <template #feedback>
                            <span class="text-xs text-gray-500">可选，建议尺寸 1200×630</span>
                        </template>
                    </n-form-item>
                </n-form>
                <template #action>
                    <n-space justify="end">
                        <n-button @click="showEditModal = false">取消</n-button>
                        <n-button :theme-overrides="themeOverrides" type="primary" :loading="updatingLink"
                            @click="handleUpdate">
                            确认修改
                        </n-button>
                    </n-space>
                </template>
            </n-modal>

            <!-- 删除确认模态框 -->
            <n-modal v-model:show="confirmDeleteModal" preset="dialog" type="error" title="确认删除"
                :content="deleteConfirmContent" positive-text="删除" negative-text="取消" :loading="deletingLink"
                @positive-click="handleDelete" @negative-click="cancelDelete" />

            <!-- 链接预览模态框 -->
            <n-modal v-model:show="showPreviewModal" preset="card" title="预览" :bordered="false" size="medium"
                :style="modalStyle">
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">{{ previewLinkData.title }}</h3>
                    <p class="text-gray-600">{{ previewLinkData.content }}</p>
                    <!-- <div v-if="previewLinkData.img_url" class="my-4 max-h-60 overflow-hidden rounded">
                    <img :src="previewLinkData.img_url" :alt="previewLinkData.title" class="w-full h-auto" />
                </div> -->
                    <n-button :theme-overrides="themeOverrides" type="primary" @click="openLink(previewLinkData.url)"
                        block>
                        访问链接
                    </n-button>
                </div>
            </n-modal>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { AdminStore } from '../../stores/AdminStore'
import {
    useMessage,
    NButton,
    NModal,
    NInput,
    NSpace,
    NSpin,
    NForm,
    NFormItem
} from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import themeOverrides from '../../themeOverrides'

// 图标注册
const icons = {
    faPlus,
    faEdit,
    faTrash
}

// 组件状态
const showAddModal = ref(false)
const showEditModal = ref(false)
const showPreviewModal = ref(false)
const editLink = ref({ id: null, title: '', content: '', url: '', img_url: '' })
const previewLinkData = ref({ title: '', content: '', url: '', img_url: '' })
const selectedLink = ref(null)
const data = ref([])
const addLink = ref({ title: '', content: '', url: '', img_url: '' })
const confirmDeleteModal = ref(false)

// 表单引用
const addFormRef = ref(null)
const editFormRef = ref(null)

// 加载状态
const loading = ref(false)
const addingLink = ref(false)
const updatingLink = ref(false)
const deletingLink = ref(false)

// 表单验证规则
const formRules = {
    title: {
        required: true,
        message: '请输入标题',
        trigger: 'blur'
    },
    content: {
        required: true,
        message: '请输入内容',
        trigger: 'blur'
    },
    url: {
        required: true,
        message: '请输入URL',
        trigger: 'blur',
        validator: (rule, value) => {
            if (!value) return false
            return value.startsWith('http://') || value.startsWith('https://')
        },
        message: 'URL必须以http://或https://开头'
    }
}

// 计算属性 - 删除确认提示内容
const deleteConfirmContent = computed(() => {
    return `确定要删除链接 "${selectedLink.value?.title || ''}" 吗？`
})

// 模态框样式
const modalStyle = {
    width: '80%',
    maxWidth: '500px'
}

// 使用adminStore
const adminStore = AdminStore()

// 消息提示
const message = useMessage()

// 格式化URL显示
const formatUrl = (url) => {
    if (!url) return ''
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

// 图片加载错误处理
const handleImageError = (e) => {
    e.target.style.display = 'none'
}

// 预览链接
const previewLink = (link) => {
    previewLinkData.value = { ...link }
    showPreviewModal.value = true
}

// 打开链接
const openLink = (url) => {
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
}

// 打开编辑模态框
const openEditModal = (row) => {
    editLink.value = { ...row }
    showEditModal.value = true
}

// 处理添加操作
const handleAdd = async () => {
    try {
        await addFormRef.value?.validate()
        addingLink.value = true

        const res = await axios.post("/links/_token/add", {
            title: addLink.value.title,
            content: addLink.value.content,
            url: addLink.value.url,
            img_url: addLink.value.img_url
        })

        if (res.data.code === 200) {
            message.success("链接添加成功！")
            addLink.value = { title: '', content: '', url: '', img_url: '' }
            showAddModal.value = false
            await loadDatas()
        } else {
            message.error(res.data.msg || "链接添加失败")
        }
    } catch (error) {
        if (error.name !== 'ValidationError') {
            console.error("添加链接错误:", error)
            message.error("链接添加失败！请检查网络或登录状态")
        }
    } finally {
        addingLink.value = false
    }
}

// 加载数据
const loadDatas = async () => {
    loading.value = true
    try {
        const res = await axios.get("/links/search")
        if (res.data.code === 200) {
            data.value = res.data.data
        } else {
            console.error("加载数据失败:", res.data.msg)
            message.error("加载链接失败")
        }
    } catch (error) {
        console.error("加载数据错误:", error)
        message.error("加载链接失败！请检查网络连接")
    } finally {
        loading.value = false
    }
}

// 删除行
const deleteRow = (row) => {
    selectedLink.value = row
    confirmDeleteModal.value = true
}

// 处理删除操作
const handleDelete = async () => {
    deletingLink.value = true
    if (selectedLink.value) {
        try {
            const res = await axios.delete(`/links/_token/delete?id=${selectedLink.value.id}`)
            if (res.data.code === 200) {
                message.success("删除成功！")
                await loadDatas()
            } else {
                message.error(res.data.msg || "删除失败")
            }
        } catch (error) {
            console.error("删除链接错误:", error)
            message.error("删除失败！请检查网络或登录状态")
        } finally {
            confirmDeleteModal.value = false
            selectedLink.value = null
            deletingLink.value = false
        }
    }
}

// 取消删除
const cancelDelete = () => {
    confirmDeleteModal.value = false
    selectedLink.value = null
}

// 处理更新操作
const handleUpdate = async () => {
    try {
        await editFormRef.value?.validate()
        updatingLink.value = true

        const res = await axios.put("/links/_token/update", {
            id: editLink.value.id,
            title: editLink.value.title,
            content: editLink.value.content,
            url: editLink.value.url,
            img_url: editLink.value.img_url
        })

        if (res.data.code === 200) {
            message.success("修改成功！")
            showEditModal.value = false
            await loadDatas()
        } else {
            message.error(res.data.msg || "修改失败")
        }
    } catch (error) {
        if (error.name !== 'ValidationError') {
            console.error("修改链接错误:", error.response?.data || error.message)
            message.error("修改失败！请检查网络或登录状态")
        }
    } finally {
        updatingLink.value = false
    }
}

// 组件挂载时加载数据
onMounted(() => {
    loadDatas()
})
</script>

<style scoped>
/* 确保按钮居中显示 */
.n-space {
    display: flex;
    justify-content: center;
}

/* 移除模态框的边框和阴影 */
.custom-card {
    border: none !important;
    box-shadow: none !important;
}
</style>