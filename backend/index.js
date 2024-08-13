import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" , credentials:true}));
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api", (req, res)=>{
	res.send("Welcome to the API")
})
app.use("/", (req, res)=>{
	res.send("Welcome to the API")
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "./frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./frontend", "dist", "index.html"));
	});
}

connectDB();

export default app;