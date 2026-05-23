export const getFileUrl = (fileName) => {
  if (!fileName) return null;

  // If the stored value is already a full URL, return it unchanged.
  if (/^https?:\/\//i.test(fileName)) return fileName;

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 5000;
  const protocol = process.env.PROTOCOL || "http";

  return `${protocol}://${host}:${port}/uploads/${fileName}`;
};
