import Folder from "../models/Folder.js";
import Image from "../models/Image.js";

export const calculateFolderSize = async (folderId) => {
  
  const images = await Image.find({ folder: folderId });

  let totalSize = images.reduce((sum, img) => sum + img.size, 0);

  
  const childFolders = await Folder.find({ parentFolder: folderId });

  
  for (const child of childFolders) {
    const childSize = await calculateFolderSize(child._id);
    totalSize += childSize;
  }

  return totalSize;
};