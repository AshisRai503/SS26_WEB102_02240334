const supabase = require('../lib/supabase');
const crypto = require('crypto');
const path = require('path');

// Generate a unique file name to avoid collisions
const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalName);

  return `${timestamp}-${randomString}${extension}`;
};

// Upload a file to Supabase Storage
const uploadFile = async (bucketName, filePath, fileData) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileData, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const fileUrl = getPublicUrl(bucketName, filePath);

    return { data, fileUrl };
  } catch (error) {
    console.error(`Error uploading file to ${bucketName}:`, error);
    throw error;
  }
};

// Get a public URL for a file
const getPublicUrl = (bucketName, filePath) => {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Remove a file from Supabase Storage
const removeFile = async (bucketName, filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error removing file from ${bucketName}:`, error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  getPublicUrl,
  removeFile,
  generateUniqueFileName,
};