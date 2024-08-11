import Url from "../model/url.schema.js";
import { ErrorWithStatus } from "../middlewares/errorHandler.js";
import { generateShortUrl } from "../utils/urlShortener.js";
import axios from 'axios';

export const createShortUrl = async (req, res) => {
    const { originalUrl, customUrl } = req.body;
    let shortUrl = customUrl || generateShortUrl();

    try {
        // Check if the customUrl already exists
        if (customUrl) {
            const existingCustomUrl = await Url.findOne({ shortUrl: customUrl });
            if (existingCustomUrl) {
          throw new ErrorWithStatus("Custom URL already exists", 404);
            }
        }

        // Check if the generated shortUrl already exists
        const existingUrl = await Url.findOne({ shortUrl });
        if (existingUrl) {
            return res.status(400).json({ error: 'Short URL already exists' });
        }

        const urlData = { originalUrl, shortUrl };

        // If the user is authenticated, add the ID to the createdBy field
        if (req.user) {
            urlData.createdBy = req.user._id;
        }

        const url = new Url(urlData);
        await url.save();
        res.status(201).json(url);
    } catch (err) {
        res.status(500).json({ error: "Failed to create short URL: " + err.message });
    }
};

export const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            throw new ErrorWithStatus("URL not found", 404)
        }

        // Update click count
        url.clicks++;

        // Gather analytics data
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const location = await getLocation(ipAddress);

        url.analytics.push({
            ipAddress,
            userAgent,
            location,
        });

        // Save the updated URL document
        await url.save();

        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve original URL: ' + err.message });
    }
};

export const getAnalytics = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        res.status(200).json({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
            analytics: url.analytics,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve analytics: ' + err.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const urls = await Url.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve history: ' + err.message });
    }
};

// Helper function to get the location from the IP address
const getLocation = async (ipAddress) => {
    try {
        const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        if (response.data && response.data.city && response.data.country_name) {
            return `${response.data.city}, ${response.data.country_name}`;
        } else {
            return 'Unknown Location';
        }
    } catch (error) {
        console.error('Error fetching location data:', error.message);
        return 'Unknown Location';
    }
};


export const deleteUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        // Find and remove the URL document
        const result = await Url.findOneAndDelete({ shortUrl });

        // Check if the URL was found and deleted
        if (!result) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Return success response
        res.status(200).json({ message: "URL deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete URL: ' + err.message });
    }
};