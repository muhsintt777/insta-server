import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error("no db url found");
    await mongoose.connect(MONGO_URI, {
      dbName: "test",
    });
    console.log(`mongoDB connected`);
  } catch (err) {
    console.log("mongodb connection failed", err);
    process.exit(1);
  }
};
