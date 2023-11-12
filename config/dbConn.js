import mongoose from "mongoose";
import config from "config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("DATABASE_URI"));
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
