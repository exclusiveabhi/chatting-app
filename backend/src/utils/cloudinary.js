// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";

// Return "https" URLs by setting secure: true
const getCloudinaryConfig = () => {
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  };
};

const getPublicIdFromCloudinaryUrl = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0]; // Remove file extension
  return publicId;
};

export const deleteResumeThumbail = async (url) => {
  try {
    const publicId = getPublicIdFromCloudinaryUrl(url);
    cloudinary.config(getCloudinaryConfig());
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
export const getResumeThumbnail = async (imgData) => {
  try {
    cloudinary.config(getCloudinaryConfig());
    const options = {
      transformation: [{ crop: "thumb" }],
    };
    const result = await cloudinary.uploader.upload(imgData, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
