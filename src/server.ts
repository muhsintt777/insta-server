import * as dotenv from "dotenv";
dotenv.config();

// import { dbConnection } from "configs/db";
import { app } from "./app";
import { connectDB } from "configs/mongoDB";
const PORT = process.env.PORT || "3500";

async function startServer() {
  try {
    // await dbConnection.authenticate();
    // await dbConnection.sync();
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

startServer();
