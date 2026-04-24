import express from "express";
import {
  uploadImage,
  getImagesByFolder,
} from "../controllers/imageControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Upload image
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

// Get images of a folder
router.get("/:folderId", authMiddleware, getImagesByFolder);

export default router;