// Require the cloudinary library and dotenv
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Log the configuration (optional, for debugging)
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    transformation: [{ crop: "thumb" }],
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

//////////////////
//
// Main function
//
//////////////////
(async () => {
  await uploadImage("https://res.cloudinary.com/dtsydvdw8/image/upload/v1706421894/auvld2cvnhr6k6loaln1.png");
})();
