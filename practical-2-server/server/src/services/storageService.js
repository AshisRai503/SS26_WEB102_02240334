const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const uploadRoot = path.join(process.cwd(), "uploads");

const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  const extension = path.extname(originalName);

  return `${timestamp}-${randomString}${extension}`;
};

const uploadFile = async (bucketName, filePath, fileBuffer) => {
  const fullFolderPath = path.join(uploadRoot, bucketName, path.dirname(filePath));
  const fullFilePath = path.join(uploadRoot, bucketName, filePath);

  fs.mkdirSync(fullFolderPath, { recursive: true });
  fs.writeFileSync(fullFilePath, fileBuffer);

  const cleanPath = filePath.replace(/\\/g, "/");
  const fileUrl = `/uploads/${bucketName}/${cleanPath}`;

  return {
    fileUrl,
    path: cleanPath,
  };
};

const removeFile = async (bucketName, filePath) => {
  const fullFilePath = path.join(uploadRoot, bucketName, filePath);

  if (fs.existsSync(fullFilePath)) {
    fs.unlinkSync(fullFilePath);
  }

  return true;
};

module.exports = {
  generateUniqueFileName,
  uploadFile,
  removeFile,
};