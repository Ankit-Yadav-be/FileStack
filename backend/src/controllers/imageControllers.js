import Image from "../models/Image.js";
import Folder from "../models/Folder.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

//  Upload Image
export const uploadImage = async (req, res) => {
  try {

    const { name, folderId } = req.body;

    // Check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Check folder
    const folder = await Folder.findOne({
      _id: folderId,
      user: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }


    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "drive_app" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const image = await Image.create({
      name,
      url: result.secure_url,
      size: req.file.size,
      folder: folderId,
      user: req.user._id,
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Images by Folder
export const getImagesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const images = await Image.find({
      folder: folderId,
      user: req.user._id,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};