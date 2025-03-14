import CryptoJS from "crypto-js";

// 前端加密函数修正
export const encryptData = (plainText) => {
    const message = plainText;
    const secretKey = "MySecretKey";
    const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
    return encryptedMessage;
};


