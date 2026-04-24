import API from "./api";

// Create folder
export const createFolderAPI = async (data) => {
  const res = await API.post("/folders", data);
  return res.data;
};

// Get folder tree
export const getFolderTreeAPI = async () => {
  const res = await API.get("/folders/tree");
  return res.data;
};

// Add this
export const getFolderSizeAPI = async (folderId) => {
  const res = await API.get(`/folders/${folderId}/size`);
  return res.data;
};