import express from "express";
import {
  createFolder,
  getFolders,
  getFolderSize,
  getFolderTree,
} from "../controllers/folderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);
router.get("/tree", authMiddleware, getFolderTree);
router.get("/:folderId/size", authMiddleware, getFolderSize);

export default router;