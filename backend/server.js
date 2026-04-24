import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import folderRoutes from "./src/routes/folderRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: "https://file-stack-34wv.vercel.app"
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);


export default app;