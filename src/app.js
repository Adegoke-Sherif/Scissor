import express from "express";
import dotenv from "dotenv";
import { connect } from "../src/database/db.js";
import urlRouter from "./routes/url.routes.js";

dotenv.config();
//express app
const app = express();
const PORT = process.env.PORT || 4400;
  
//Middlewares
app.use(express.json())

//routes
app.use("/api/urls", urlRouter)

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