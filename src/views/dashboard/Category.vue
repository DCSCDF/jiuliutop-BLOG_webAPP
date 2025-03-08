<template>
    <div class="w-full overflow-hidden bg-white rounded-lg">
        <div class="rounded-t-lg p-3 flex justify-between items-center">
            <div class="ml-5 md:ml-18">
                <span>分类列表</span>
            </div>
            <div class="mr-5 md:mr-18">
                <n-button color="#6b7281" :theme-overrides="themeOverrides" @click="showModal = true">添加分类</n-button>
            </div>
        </div>
        <div class="flex justify-center">
            <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false"
                :show-header="false" />
        </div>

        <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="添加分类" size="huge"
            :bordered="false" :segmented="segmented">
            <n-input v-model:value="addCategory.name" type="text" placeholder="输入名称"
                :theme-overrides="themeOverrides" />
            <template #footer>
                <n-button color="#6b7281" @click="add">确认</n-button>
            </template>
        </n-modal>

        <!-- 确认删除模态框 -->
        <n-modal type="error" v-model:show="confirmDeleteModal" preset="dialog" title="确认" content="你确认要删除此分类吗？"
            positive-text="删除" negative-text="取消" @positive-click="handleDelete" @negative-click="cancelDelete" />
        <n-modal v-model:show="showEditModal" class="custom-card" preset="card" :style="bodyStyle" title="修改分类"
            size="huge" :bordered="false" :segmented="segmented">
            <n-input v-model:value="editCategory.name" type="text" placeholder="输入新名称"
                :theme-overrides="themeOverrides" />

            <template #footer>
                <n-button color="#6b7281" @click="update">确认修改</n-button>
            </template>
        </n-modal>
        <div class="py-5  ">

        </div>
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
            title: "分类名称",
            key: "name",
            align: "center" // 设置列内容居中
        },
        {
            title: "操作",
            key: "actions",
            align: "center", // 设置列内容居中
            render(row) {
                return h(
                    NSpace,
                    {
                        justify: "center" // 确保按钮居中显示
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
        const editCategory = ref({ id: null, name: '' });
        const selectedCategory = ref(null); // 存储待删除的分类对象
        const data = ref([]); // 将 data 定义为响应式引用
        const showModal = ref(false); // 确保 showModal 初始化为 false
        const addCategory = ref({ name: '' }); // 添加分类对象
        const confirmDeleteModal = ref(false); // 控制确认删除模态框的显示
        const segmented = ref(true);

        onMounted(() => {
            loadDatas();
        });
        // 修改columns定义
        const columns = createColumns({
            edit(row) {
                editCategory.value = { id: row.id, name: row.name };
                showEditModal.value = true;
            },
            deleteRow(row) {
                deleteRow(row);
            }
        });
        // 新增修改方法
        const update = async () => {
            try {
                const res = await axios.put("/category/_token/update", {
                    id: editCategory.value.id,
                    name: editCategory.value.name
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
                editCategory.value = { id: null, name: '' }; // 清除编辑数据
            }
        };
        // 使用 provide 和 inject 获取 adminStore
        const adminStore = AdminStore();
        provide('adminStore', adminStore);

        const message = useMessage();

        const add = async () => {
            try {
                let res = await axios.post("/category/_token/add", { name: addCategory.value.name });
                if (res.data.code === 200) {
                    message.success("分类添加成功！");
                }
                showModal.value = false; // 关闭模态窗口
                loadDatas(); // 刷新数据
            } catch (error) {
                console.error("Error adding category:", error); // 添加调试日志
                message.error("分类添加失败！请检查网络或登录状态");
            }
        };
        const loadDatas = async () => {
            try {
                let res = await axios.get("/category/list");
                if (res.data.code === 200) {
                    data.value = res.data.data; // 提取实际的数据数组
                } else {
                    console.error("Failed to fetch data:", res.data.msg);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        const deleteRow = (row) => {
            selectedCategory.value = row; // 保存当前要删除的分类对象
            confirmDeleteModal.value = true;
        };
        const handleDelete = () => {
            if (selectedCategory.value) {
                deleteCategory(selectedCategory.value); // 使用存储的分类对象
                confirmDeleteModal.value = false;
                selectedCategory.value = null; // 清除存储
            }
        };
        const cancelDelete = () => {
            confirmDeleteModal.value = false;
            selectedCategory.value = null; // 清除存储
        };
        const handleEdit = (row) => {
            editCategory.value = { id: row.id, name: row.name };
            showEditModal.value = true;
        };

        const deleteCategory = async (category) => {
            try {
                let res = await axios.delete(`/category/_token/delete?id=${category.id}`);
                /* console.error(category) */
                if (res.data.code === 200) {
                    message.success("删除成功！");
                }
                loadDatas(); // 添加这行：删除成功后刷新列表
            } catch (error) {
                console.error("Error deleting category:", error); // 添加调试日志
                message.error("删除失败！请检查网络或登录状态");
            }
        };
        return {
            bodyStyle: {
                width: '400px'
            },
            showModal,
            addCategory,
            onPositiveClick() {
                message.success("Submit");
                showModal.value = false;
            },
            data,
            columns: createColumns({
                edit: handleEdit,
                deleteRow(row) {
                    deleteRow(row);
                },
                deleteRow(row) {
                    deleteRow(row); // 调用 deleteRow 方法
                }
            }),
            // 新增返回属性
            showEditModal,
            editCategory,
            update,
            pagination: false,
            themeOverrides, // 返回 themeOverrides
            segmented, // 返回 segmented
            add, // 确保 add 方法返回
            confirmDeleteModal, // 返回 confirmDeleteModal
            handleDelete, // 返回 handleDelete 方法
            cancelDelete // 返回 cancelDelete 方法
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