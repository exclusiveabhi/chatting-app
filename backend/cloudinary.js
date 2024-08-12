// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "dtsydvdw8",
  api_key: "368979699725658",
  api_secret: "2AhSIpg0ij3rgOXhb-5wMZI8hK4",
  secure: true,
});

// Log the configuration
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
