// import { ErrorWithStatus } from "../middlewares/errorHandler.js";
// import URL from "../model/url.schema.js";

// //create short URLS
// const createShortUrl = async (req, res, next) => {
//   try {
//     const {originalUrl} = req.body;
//     const shortUrl = Math.random().toString(16).substring(2, 6)

//     if(!originalUrl) {
//     throw new ErrorWithStatus("originalUrl is required", 404);
//     }
//     //check if Url already exist
//     const isUrlExists = await URL.findOne({originalUrl})
//     if(isUrlExists) {
//     throw new ErrorWithStatus("originalUrl already shortened", 400);
//     }
//     const newUrl = await URL.create({
//       originalUrl,
//       shortUrl
//     })
//     res.status(201).json({message: "Url created successfully", newUrl})
//   } catch (error) {
//     console.log(error)
//     throw new ErrorWithStatus("Internal Server Error");
//   }
// }

// //Get all URLS
// const getUrls = async (req, res, next) => {
//   try {
//     const urls = await URL.find({})
//     res.status(200).json({ success: true, urls})
//   } catch (error) {
//     console.error(error);
//     throw new ErrorWithStatus("Internal Server Error");
//   }
// }

// //Get URLS by ID
// const getUrlById = async(req, res, next) => {
//   try {
//     const {shortUrl} = req.params;
//     if(!shortUrl) {
//       return res.status(400).json("ShorterUrl is required")
//     }
//     const url = await URL.findOne({shortUrl});
//     if(!url) {
//       res.status(404).json("URL not found")
//     }
//     res.status(200).json(url)
//   } catch (error) {
//     console.error(error);
//     throw new ErrorWithStatus("Internal Server Error");

//   }
// }

// const redirectUrl = async (req, res, next) => {
//   try {
//     const {shortUrl} = req.params;
//     if(!shortUrl) {
//       return res.status(400).json("ShorterUrl is required")
//     }
//     const url = await URL.findOne({shortUrl})
//     if(!url) {
//       return res.status(404).json("URL not found")
//     }
//     res.status(301).redirect(url.originalUrl);
//   } catch (error) {
//     console.error(error);
//     throw new ErrorWithStatus("Internal Server Error");
//   }
// }

// const updateUrl = async (req, res, next) => {
//   const {shortUrl} = req.params;
//   const {originalUrl} = req.body;

//   if(!shortUrl || !originalUrl) {
//     return res.status(400).json("ShorterUrl & originalUrl is required")
//   }

//   try {
//     const url = await URL.findOneAndUpdate({shortUrl}, {originalUrl}, {new: true})
//     if(!url) {
//       return res.status(404).json("URL not found to update")
//     }
//     res.status(200).json(url)
//   } catch(error) {
//   console.error(error);
//   throw new ErrorWithStatus("Internal Server Error");
// }

// }


// const deleteUrl = async (req, res, next) => {
//   const {shortUrl} = req.params;

//   if(!shortUrl) {
//     return res.status(400).json("ShorterUrl  is required")
//   }

//   try {
//     const deletedUrl = await URL.findOneAndDelete({shortUrl})
//     if(!deletedUrl) {
//       return res.status(404).json("URL not found to delete")
//     }
//     res.status(200).json({message: "URL deleted successfully", deleteUrl})
//   } catch(error) {
//   console.error(error);
//   throw new ErrorWithStatus("Internal Server Error");
// }

// }


// export {
//   createShortUrl,
//   getUrls,
//   getUrlById,
//   redirectUrl,
//   updateUrl,
//   deleteUrl
// }


// // // import URL from "../model/url.schema.js";

// // // // Helper function to generate a unique short URL
// // // const generateShortUrl = async () => {
// // //   let shortUrl;
// // //   let isUnique = false;

// // //   while (!isUnique) {
// // //     shortUrl = Math.random().toString(36).substring(2, 8); // Generate a 6-character string
// // //     const existingUrl = await URL.findOne({ shortUrl });
// // //     if (!existingUrl) {
// // //       isUnique = true; // Found a unique short URL
// // //     }
// // //   }

// // //   return shortUrl;
// // // };

// // // const createShortUrl = async (req, res, next) => {
// // //   try {
// // //     const { originalUrl } = req.body;

// // //     if (!originalUrl) {
// // //       return res.status(400).json({ error: "originalUrl is required" });
// // //     }

// // //     // Validate the URL format
// // //     const urlPattern = /^(http|https):\/\/[^ "]+$/;
// // //     if (!urlPattern.test(originalUrl)) {
// // //       return res.status(400).json({ error: "Invalid URL format" });
// // //     }

// // //     // Check if the URL already exists
// // //     const existingUrl = await URL.findOne({ originalUrl });
// // //     if (existingUrl) {
// // //       return res.status(400).json({ error: "originalUrl already shortened", shortUrl: existingUrl.shortUrl });
// // //     }

// // //     // Generate a unique short URL
// // //     const shortUrl = await generateShortUrl();

// // //     // Create the new URL record
// // //     const newUrl = await URL.create({ originalUrl, shortUrl });

// // //     res.status(201).json({
// // //       message: "URL created successfully",
// // //       newUrl: {
// // //         originalUrl: newUrl.originalUrl,
// // //         shortUrl: newUrl.shortUrl,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: "Internal Server Error" });
// // //   }
// // // };

// // // export { createShortUrl };



// // import { ErrorWithStatus } from "../middlewares/errorHandler.js";
// // import URL from "../model/url.schema.js";

// // // Helper function to generate a unique short URL
// // const generateShortUrl = async () => {
// //   let shortUrl;
// //   let isUnique = false;

// //   while (!isUnique) {
// //     shortUrl = Math.random().toString(36).substring(2, 8); // Generate a 6-character string
// //     const existingUrl = await URL.findOne({ shortUrl });
// //     if (!existingUrl) {
// //       isUnique = true; // Found a unique short URL
// //     }
// //   }

// //   return shortUrl;
// // };

// // // Create short URL
// // const createShortUrl = async (req, res, next) => {
// //   try {
// //     const { originalUrl } = req.body;

// //     if (!originalUrl) {
// //       return next(new ErrorWithStatus("originalUrl is required", 400));
// //     }

// //     // Validate the URL format
// //     const urlPattern = /^(http|https):\/\/[^ "]+$/;
// //     if (!urlPattern.test(originalUrl)) {
// //       return next(new ErrorWithStatus("Invalid URL format", 400));
// //     }

// //     // Check if the URL already exists
// //     const existingUrl = await URL.findOne({ originalUrl });
// //     if (existingUrl) {
// //       return res.status(400).json({ error: "originalUrl already shortened", shortUrl: existingUrl.shortUrl });
// //     }

// //     // Generate a unique short URL
// //     const shortUrl = await generateShortUrl();

// //     // Create the new URL record
// //     const newUrl = await URL.create({ originalUrl, shortUrl });

// //     res.status(201).json({
// //       message: "URL created successfully",
// //       newUrl: {
// //         originalUrl: newUrl.originalUrl,
// //         shortUrl: newUrl.shortUrl,
// //       },
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return next(new ErrorWithStatus("Internal Server Error", 500));
// //   }
// // };

// // // Get all URLs
// // const getUrls = async (req, res, next) => {
// //   try {
// //     const urls = await URL.find({});
// //     res.status(200).json({ success: true, urls });
// //   } catch (error) {
// //     console.error(error);
// //     return next(new ErrorWithStatus("Internal Server Error", 500));
// //   }
// // };

// // // Get URL by ID
// // const getUrlById = async (req, res, next) => {
// //   try {
// //     const { shortUrl } = req.params;
// //     if (!shortUrl) {
// //       return next(new ErrorWithStatus("shortUrl is required", 400));
// //     }
// //     const url = await URL.findOne({ shortUrl });
// //     if (!url) {
// //       return next(new ErrorWithStatus("URL not found", 404));
// //     }
// //     res.status(200).json(url);
// //   } catch (error) {
// //     console.error(error);
// //     return next(new ErrorWithStatus("Internal Server Error", 500));
// //   }
// // };

// // // Update a URL
// // const updateUrl = async (req, res, next) => {
// //   const { shortUrl } = req.params;
// //   const { originalUrl } = req.body;

// //   if (!shortUrl || !originalUrl) {
// //     return next(new ErrorWithStatus("shortUrl and originalUrl are required", 400));
// //   }

// //   try {
// //     const url = await URL.findOneAndUpdate({ shortUrl }, { originalUrl }, { new: true });
// //     if (!url) {
// //       return next(new ErrorWithStatus("URL not found to update", 404));
// //     }
// //     res.status(200).json(url);
// //   } catch (error) {
// //     console.error(error);
// //     return next(new ErrorWithStatus("Internal Server Error", 500));
// //   }
// // };

// // // Delete a URL
// // const deleteUrl = async (req, res, next) => {
// //   const { shortUrl } = req.params;

// //   if (!shortUrl) {
// //     return next(new ErrorWithStatus("shortUrl is required", 400));
// //   }

// //   try {
// //     const deletedUrl = await URL.findOneAndDelete({ shortUrl });
// //     if (!deletedUrl) {
// //       return next(new ErrorWithStatus("URL not found to delete", 404));
// //     }
// //     res.status(200).json({ message: "URL deleted successfully", deletedUrl });
// //   } catch (error) {
// //     console.error(error);
// //     return next(new ErrorWithStatus("Internal Server Error", 500));
// //   }
// // };

// // export {
// //   createShortUrl,
// //   getUrls,
// //   getUrlById,
// //   updateUrl,
// //   deleteUrl,
// // };
