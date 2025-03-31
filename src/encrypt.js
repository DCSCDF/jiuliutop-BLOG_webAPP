import CryptoJS from "crypto-js";

// 前端加密函数
export const encryptData = (plainText) => {
    try {
        const message = plainText;
        const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;

        if (!secretKey) {
            throw new Error('加密密钥未配置');
        }

        const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
        return encryptedMessage;
    } catch (error) {
        console.error('加密过程中出错:', error);
        throw error; // 可以选择重新抛出或返回原始文本
    }
};