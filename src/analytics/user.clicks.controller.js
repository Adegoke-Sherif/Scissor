import axios from "axios";
import URL from "../model/url.schema.js";
import { ErrorWithStatus } from "../middlewares/errorHandler.js"; // Ensure this is correctly imported

const redirectUrl = async (req, res, next) => {

  try {
    const {shortUrl, customDomain, customPath } = req.params;
    console.log("Redirect request for:", customDomain, customPath, shortUrl);

    // Find the URL by custom domain and path
    const url = await URL.findOne({ customDomain, customPath, shortUrl });
    if (!url) {
      return next(new ErrorWithStatus("URL not found", 404));
    }

    // Track the click
    url.clickCount += 1;

    // Get IP address and User-Agent
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    // Fetch geographical details using a third-party service
    let country = "Unknown";
    let city = "Unknown";
    try {
      const geoDetails = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      country = geoDetails.data.country || "Unknown";
      city = geoDetails.data.city || "Unknown";
    } catch (geoError) {
      console.error("Failed to fetch geo details:", geoError.message);
    }

    // Record the click details
    url.clickDetails.push({
      ipAddress,
      userAgent,
      country,
      city
    });

    await url.save();

    // Redirect to the original URL
    console.log("Redirecting to:", url.originalUrl);
    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirection error:", error);
    return next(new ErrorWithStatus("Internal Server Error", 500));
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    if (!shortUrl) {
      return res.status(400).json({ message: "ShortUrl is required" });
    }

    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    const analyticsData = {
      clickCount: url.clickCount,
      clickDetails: url.clickDetails,
    };

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error("Analytics error:", error);
    return next(new ErrorWithStatus("Internal Server Error", 500));
  }
};

export {
  getAnalytics,
  redirectUrl
};
