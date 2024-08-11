import express from "express";
import dotenv from "dotenv";
import { connect } from "../src/database/db.js";
import urlRouter from "./routes/url.routes.js";
import passport from "./database/passport.js";
import qrRoutes from "./routes/qr.code.js"
import cors from "cors"
import helmet from "helmet";
import rateLimit from "express-rate-limit";


dotenv.config();


// Create a rate limiter
const apiLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 50, // limit each IP to 50 requests per windowMs
	message: "Too many requests from this IP, please try again later."
});

// Apply the rate limiter to all API routes
app.use("/api/", apiLimiter);

//express app
const app = express();
const PORT = process.env.PORT || 4400;
  
//Middlewares
app.use(express.json())
app.use(passport.initialize())
app.use(cors())
app.use(helmet());
app.use("/api/", apiLimiter); // Apply rate limiter to all API routes


//routes
app.use("/api/url", urlRouter)
app.use("/api/qr", qrRoutes)

app.get("/", (req, res) => {
	res.send("Welcome to URL Shortener")
})


app.all("*", (req, res) => {
	res.status(404).json({ message: "Page not found" });
});

//connecting to the server and MongoDB
connect().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on PORT ${PORT}`);
	});
});