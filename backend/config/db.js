import mongoose from "mongoose";
// This file is responsible for connecting to the MongoDB database using Mongoose.

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected : ${conn.connection.host}");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  process.exit(1);
};
