import Folder from "../models/Folder.js";
import { calculateFolderSize } from "../utils/folderSize.js";

//  Create Folder
export const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;

    const folder = await Folder.create({
      name,
      parentFolder: parentFolder || null,
      user: req.user._id,
    });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Folders (user specific)
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id });

    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const buildFolderTree = (folders, parentId = null) => {
  return folders
    .filter(
      (folder) =>
        String(folder.parentFolder) === String(parentId)
    )
    .map((folder) => ({
      ...folder._doc,
      children: buildFolderTree(folders, folder._id),
    }));
};


export const getFolderTree = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id });

    const tree = buildFolderTree(folders);

    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  Get Folder Size
export const getFolderSize = async (req, res) => {
  try {
    const { folderId } = req.params;

    const size = await calculateFolderSize(folderId);

    res.json({
      folderId,
      totalSize: size, // bytes me
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};