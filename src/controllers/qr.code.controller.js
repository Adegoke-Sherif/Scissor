import Url from "../model/url.schema.js";
import { generateQRCode } from "../utils/qrGenerator.js";

export const generateQrCodeForUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) return res.status(404).json({ message: 'URL not found' });

        const qrCodeUrl = await generateQRCode("${process.env.BASE_URL}/${shortUrl}");
        url.qrCodeUrl = qrCodeUrl;
        await url.save();

        res.status(200).json({ qrCodeUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};