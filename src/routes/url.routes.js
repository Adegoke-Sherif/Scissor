import express from "express";
import { createShortUrl, deleteUrl, getAnalytics, getHistory, getOriginalUrl } from "../controllers/url.controller.js";
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", getOriginalUrl);
router.get("/analytics/:shortUrl", auth, getAnalytics); //protected route
router.get("/history/:shortUrl", auth, getHistory); //protected route
router.delete('/url/:shortUrl', deleteUrl);


export default router;