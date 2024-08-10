import { Router } from "express";
// import { createShortUrl, deleteUrl, getUrlById, getUrls, updateUrl } from "../controllers/url.controller.js";
import { createCustomUrl, getLinkHistory, redirectCustomUrl } from "../controllers/custom.route.controller.js";
import { serveQrCodeImage } from "../controllers/qr.code.controller.js";
import { getAnalytics, redirectUrl } from "../analytics/user.clicks.controller.js";


const urlRouter = Router()

// // create short URL
// urlRouter.post("/create", createShortUrl)

// // Get all Urls
// urlRouter.get("/", getUrls)

// // Get URLS by ID
// urlRouter.get("/:shortUrl",getUrlById)


// // update url
// urlRouter.put("/:shortUrl", updateUrl)

// // delete a Url
// urlRouter.delete("/:shortUrl", deleteUrl)

urlRouter.post("/shorten/custom", createCustomUrl);

// Route for redirecting to the original URL
urlRouter.get("/:customDomain/:customPath", redirectCustomUrl);

urlRouter.get("/qrcode/:shortUrl", serveQrCodeImage);

urlRouter.get("/analytics/shortUrl", getAnalytics);

urlRouter.get("/analytics/:redirect", redirectUrl);

urlRouter.get('/link-history', getLinkHistory);









export default urlRouter