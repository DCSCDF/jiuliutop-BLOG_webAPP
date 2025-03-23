import axios from 'axios';

/**
 * 获取设置信息
 * @param {number} id - 设置信息的 ID
 * @returns {Promise<Object|null>} - 返回设置信息，如果失败则返回 null
 */
export const fetchSettings = async (id = 1) => {
    try {
        const res = await axios.get(`/setting/${id}`);
        if (res.data.code === 200) {
            return res.data.data; // 返回设置信息
        } else {
            console.error('未找到对应数据');
            return null;
        }
    } catch (error) {
        console.error('查询失败', error);
        return null;
    }
};