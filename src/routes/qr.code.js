import express from "express";
import { generateQrCodeForUrl } from "../controllers/qr.code.controller.js";

const router = express.Router();

router.get("/qr/:shortUrl", generateQrCodeForUrl);

export default router;