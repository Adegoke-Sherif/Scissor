import axios from "axios";
import { ErrorWithStatus } from "../middlewares/errorHandler.js";
import URL from "../model/url.schema.js";

// Serve the QR code image
const serveQrCodeImage = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    // Find the URL by shortUrl
    const urlRecord = await URL.findOne({ shortUrl });
    if (!urlRecord) {
      return next(new ErrorWithStatus("URL not found", 404));
    }

    // Check if the QR code URL exists
    if (!urlRecord.qrCodeUrl) {
      return next(new ErrorWithStatus("QR code not found", 404));
    }

    // Fetch the QR code image from the third-party API
    const response = await axios.get(urlRecord.qrCodeUrl, {
      responseType: 'arraybuffer' // Ensures that the response is treated as binary data
    });

    // Set the content type to image/png (or whatever format the API returns)
    res.setHeader('Content-Type', 'image/png');
    
    // Send the image data to the client
    res.send(response.data);
  } catch (error) {
    console.error(error);
    return next(new ErrorWithStatus("Internal Server Error", 500));
  }
};

export { serveQrCodeImage };
