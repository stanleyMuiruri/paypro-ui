import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Change this to a secure key

// Encrypt Data
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt Data
export const decryptData = (cipherText) => {
    if (!cipherText) {
        console.error("Decryption failed: No data found");
        return null;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            console.error("Decryption failed: Data is empty or corrupted");
            return null;
        }

        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

