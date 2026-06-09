export const getFileUrl = (fileName) => {
  if (!fileName) return null;

  if (/^https?:\/\//i.test(fileName)) {
    return fileName;
  }

  return `${process.env.FILE_SERVICE_URL}/uploads/${fileName}`;
};
