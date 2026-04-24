const formatSize = (bytes) => {
  if (!bytes) return "0 MB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export default formatSize;