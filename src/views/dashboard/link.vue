<template>
    <div class="w-full overflow-hidden bg-white rounded-lg">
        <div class="rounded-t-lg p-3 flex justify-between items-center">
            <div class="ml-5 md:ml-18 text-gray-900">
                <span>链接列表</span>
            </div>
            <div class="mr-5 md:mr-18">
                <n-button color="#6b7281" :theme-overrides="themeOverrides" @click="showModal = true">添加链接</n-button>
            </div>
        </div>
        <div class="flex justify-center">
            <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false"
                :show-header="false" />
        </div>

        <!-- 添加链接模态框 -->
        <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="添加链接" size="huge"
            :bordered="false" :segmented="segmented">
            <n-input style="margin:10px 0px;" v-model:value="addLink.title" type="text" placeholder="输入标题"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="addLink.content" type="text" placeholder="输入内容"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="addLink.url" type="text" placeholder="输入URL"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="addLink.img_url" type="text" placeholder="输入图片URL"
                :theme-overrides="themeOverrides" />
            <template #footer>
                <n-button color="#6b7281" @click="add">确认</n-button>
            </template>
        </n-modal>

        <!-- 确认删除模态框 -->
        <n-modal type="error" v-model:show="confirmDeleteModal" preset="dialog" title="确认" content="你确认要删除此链接吗？"
            positive-text="删除" negative-text="取消" @positive-click="handleDelete" @negative-click="cancelDelete" />

        <!-- 修改链接模态框 -->
        <n-modal v-model:show="showEditModal" class="custom-card" preset="card" :style="bodyStyle" title="修改链接"
            size="huge" :bordered="false" :segmented="segmented">
            <n-input style="margin:10px 0px;" v-model:value="editLink.title" type="text" placeholder="输入标题"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="editLink.content" type="text" placeholder="输入内容"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="editLink.url" type="text" placeholder="输入URL"
                :theme-overrides="themeOverrides" />
            <n-input style="margin:10px 0px;" v-model:value="editLink.img_url" type="text" placeholder="输入图片URL"
                :theme-overrides="themeOverrides" />
            <template #footer>
                <n-button color="#6b7281" @click="update">确认修改</n-button>
            </template>
        </n-modal>
        <div class="py-5"></div>
    </div>
</template>

<script>
import themeOverrides from '../../themeOverrides'; // 引入自定义主题
import { NButton, useMessage, NSpace, NDataTable, NModal, NInput } from "naive-ui";
import { defineComponent, h, ref, onMounted, provide } from "vue";
import axios from 'axios'; // 导入 axios
import { AdminStore } from '../../stores/AdminStore';

function createColumns({
    edit,
    deleteRow
}) {
    return [
        {
            title: "标题",
            key: "title",
            align: "center"
        },
        {
            title: "内容",
            key: "content",
            align: "center"
        },
        {
            title: "URL",
            key: "url",
            align: "center"
        },
        // {
        //     title: "图片URL",
        //     key: "img_url",
        //     align: "center"
        // },
        {
            title: "操作",
            key: "actions",
            align: "center",
            render(row) {
                return h(
                    NSpace,
                    {
                        justify: "center"
                    },
                    {
                        default: () => [
                            h(
                                NButton,
                                {
                                    strong: true,
                                    tertiary: true,
                                    size: "small",
                                    onClick: () => edit(row)
                                },
                                { default: () => "修改" }
                            ),
                            h(
                                NButton,
                                {
                                    strong: true,
                                    tertiary: true,
                                    size: "small",
                                    onClick: () => deleteRow(row),
                                },
                                { default: () => "删除" }
                            )
                        ]
                    }
                );
            }
        }
    ];
}

export default defineComponent({
    components: {
        NButton,
        NInput,
        NModal,
        NDataTable,
        NSpace,
    },
    setup() {
        // 状态
        const showEditModal = ref(false);
        const editLink = ref({ id: null, title: '', content: '', url: '', img_url: '' });
        const selectedLink = ref(null); // 存储待删除的链接对象
        const data = ref([]); // 将 data 定义为响应式引用
        const showModal = ref(false); // 确保 showModal 初始化为 false
        const addLink = ref({ title: '', content: '', url: '', img_url: '' }); // 添加链接对象
        const confirmDeleteModal = ref(false); // 控制确认删除模态框的显示
        const segmented = ref(true);

        onMounted(() => {
            loadDatas();
        });

        // 修改columns定义
        const columns = createColumns({
            edit(row) {
                editLink.value = { id: row.id, title: row.title, content: row.content, url: row.url, img_url: row.img_url };
                showEditModal.value = true;
            },
            deleteRow(row) {
                deleteRow(row);
            }
        });

        // 新增修改方法
        const update = async () => {
            try {
                const res = await axios.put("/links/_token/update", {
                    id: editLink.value.id,
                    title: editLink.value.title,
                    content: editLink.value.content,
                    url: editLink.value.url,
                    img_url: editLink.value.img_url
                });

                if (res.data.code === 200) {
                    message.success("修改成功！");
                    showEditModal.value = false;
                    loadDatas();
                } else {
                    message.error(res.data.msg || "修改失败");
                }
            } catch (error) {
                console.error("修改请求失败:", error.response?.data || error.message);
                message.error("修改失败！请检查网络或登录状态");
            } finally {
                editLink.value = { id: null, title: '', content: '', url: '', img_url: '' }; // 清除编辑数据
            }
        };

        // 使用 provide 和 inject 获取 adminStore
        const adminStore = AdminStore();
        provide('adminStore', adminStore);

        const message = useMessage();

        // 添加链接
        const add = async () => {
            try {
                let res = await axios.post("/links/_token/add", {
                    title: addLink.value.title,
                    content: addLink.value.content,
                    url: addLink.value.url,
                    img_url: addLink.value.img_url
                });
                if (res.data.code === 200) {
                    message.success("链接添加成功！");
                }
                showModal.value = false; // 关闭模态窗口
                loadDatas(); // 刷新数据
            } catch (error) {
                console.error("Error adding link:", error); // 添加调试日志
                message.error("链接添加失败！请检查网络或登录状态");
            }
        };

        // 加载链接数据
        const loadDatas = async () => {
            try {
                let res = await axios.get("/links/search");
                if (res.data.code === 200) {
                    data.value = res.data.data; // 提取实际的数据数组
                } else {
                    console.error("Failed to fetch data:", res.data.msg);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        // 删除链接
        const deleteRow = (row) => {
            selectedLink.value = row; // 保存当前要删除的链接对象
            confirmDeleteModal.value = true;
        };

        // 确认删除
        const handleDelete = () => {
            if (selectedLink.value) {
                deleteLink(selectedLink.value); // 使用存储的链接对象
                confirmDeleteModal.value = false;
                selectedLink.value = null; // 清除存储
            }
        };

        // 取消删除
        const cancelDelete = () => {
            confirmDeleteModal.value = false;
            selectedLink.value = null; // 清除存储
        };

        // 删除链接请求
        const deleteLink = async (link) => {
            try {
                let res = await axios.delete(`/links/_token/delete?id=${link.id}`);
                if (res.data.code === 200) {
                    message.success("删除成功！");
                }
                loadDatas(); // 删除成功后刷新列表
            } catch (error) {
                console.error("Error deleting link:", error); // 添加调试日志
                message.error("删除失败！请检查网络或登录状态");
            }
        };

        return {
            bodyStyle: {
                width: '400px'
            },
            showModal,
            addLink,
            onPositiveClick() {
                message.success("Submit");
                showModal.value = false;
            },
            data,
            columns: createColumns({
                edit: (row) => {
                    editLink.value = { id: row.id, title: row.title, content: row.content, url: row.url, img_url: row.img_url };
                    showEditModal.value = true;
                },
                deleteRow(row) {
                    deleteRow(row); // 调用 deleteRow 方法
                }
            }),
            showEditModal,
            editLink,
            update,
            pagination: false,
            themeOverrides,
            segmented,
            add,
            confirmDeleteModal,
            handleDelete,
            cancelDelete
        };
    }
});
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