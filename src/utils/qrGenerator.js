import axios from "axios";

export const generateQRCode = async (url) => {
    const response = await axios.get("https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=200x200");
    return response.config.url;
};