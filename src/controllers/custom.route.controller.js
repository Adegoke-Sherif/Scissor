import { ErrorWithStatus } from "../middlewares/errorHandler.js";
import URL from "../model/url.schema.js";
import crypto from "crypto";

//to generate a unique short URL
const generateShortUrl = async () => {
  let shortUrl;
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    shortUrl = crypto.randomBytes(3).toString('hex'); // Generate a 6-character string
    const existingUrl = await URL.findOne({ shortUrl });
    if (!existingUrl) {
      isUnique = true; // Found a unique short URL
    }
    attempts++;
  }

  if (!isUnique) {
    throw new ErrorWithStatus("Failed to generate a unique short URL", 500);
  }

  return shortUrl;
};

// Function to generate QR Code URL using GoQR.me API
const generateQrCodeUrl = async (shortUrl) => {
  try {
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(shortUrl)}&size=150x150`;
    return qrCodeApiUrl;
  } catch (error) {
    throw new ErrorWithStatus("Failed to generate QR code", 500);
  }
};

// Create custom URL with QR code generation
const createCustomUrl = async (req, res, next) => {
  try {
    const { originalUrl, customDomain, customPath } = req.body;

    if (!originalUrl) {
      return next(new ErrorWithStatus("originalUrl is required", 400));
    }

    // Validate the URL format
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(originalUrl)) {
      return next(new ErrorWithStatus("Invalid URL format", 400));
    }
    // Check if the custom path is unique
    if (customPath) {
      const existingCustomPath = await URL.findOne({ customDomain, customPath });
      if (existingCustomPath) {
        return next(new ErrorWithStatus("Custom path already in use", 400));
      }
    }

    // Generate a unique short URL if customPath is not provided
    const shortUrl = customPath || await generateShortUrl();

    // Set the custom domain or default
    // const domain = customDomain || "http://localhost:6000";
    const domain = customDomain || "http://localhost:6000";


    // Generate QR Code URL
    const fullShortUrl = `${domain}/${shortUrl}`;
    const qrCodeUrl = await generateQrCodeUrl(fullShortUrl);

    // Create the new URL record
    const newUrl = await URL.create({
      originalUrl,
      customDomain: domain,
      customPath: customPath || shortUrl,
      shortUrl,
      qrCodeUrl: qrCodeUrl
    });

    res.status(201).json({
      message: "Custom URL created successfully",
      newUrl: {
        originalUrl: newUrl.originalUrl,
        shortUrl: fullShortUrl,
        customDomain: newUrl.customDomain,
        customPath: newUrl.customPath,
        qrCodeUrl: newUrl.qrCodeUrl,
        createdAt: newUrl.createdAt, // Include creation timestamp
      },
    });
  } catch (error) {
    console.error(error);
    return next(error instanceof ErrorWithStatus ? error : new ErrorWithStatus("Internal Server Error", 500));
  }
};


const redirectCustomUrl = async (req, res, next) => {
  try {
    const { shortUrl, customDomain, customPath } = req.params;
    
    const url = await URL.findOne({ shortUrl, customDomain, customPath });
    if (!url) {
      return next(new ErrorWithStatus("URL not found", 404));
    }
    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    return next(new ErrorWithStatus("Internal Server Error", 500));
  }
};

const getLinkHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return next(new ErrorWithStatus("User not authenticated", 401));
    }

    const links = await URL.find({ user: userId }).sort({ createdAt: -1 }); // Sort by creation date

    res.status(200).json(links);
  } catch (error) {
    console.error("Error fetching link history:", error);
    return next(new ErrorWithStatus("Internal Server Error", 500));
  }
};


export { createCustomUrl, redirectCustomUrl, getLinkHistory };
