import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
const setup = () => {
  const testUri = process.env.MONGODB_URI_TEST;
  const prodUri = process.env.MONGODB_URI_PROD;
  const uri = process.env.NODE_ENV === "test" ? testUri : prodUri;
  // const uri = "mongodb+srv://dev:devpassword@cluster0.yv7pycf.mongodb.net/test?retryWrites=true&w=majority";
  // const uri =
  //   "mongodb+srv://test:testpassword@cluster0.wp2ntc7.mongodb.net/tailor-my-resume-test-db?retryWrites=true&w=majority";
  if (!uri) {
    console.error("Check how to setup env from README.md");
    process.exit(1);
  }

  mongoose.connect(uri);

  // Check if the connection was successful
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  return db;
};

export default setup;
