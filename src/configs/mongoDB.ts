import { connect } from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error("no db url found");

    const connectionInstance = await connect(MONGO_URI);
    console.log(
      `mongoDB connected HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("mongodb connection failed", err);
    process.exit(1);
  }
};
