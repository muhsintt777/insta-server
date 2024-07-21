import { connect } from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error("no db url found");

    // set("bufferCommands", false);
    const connectionInstance = await connect(MONGO_URI, {
      serverSelectionTimeoutMS: 1000 * 10,
      socketTimeoutMS: 1000 * 10,
    });
    console.log(
      `mongoDB connected HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("mongodb connection failed", err);
    process.exit(1);
  }
};
