import * as dotenv from 'dotenv';
dotenv.config();

// import { dbConnection } from "configs/db";
import { connectDB } from 'configs/mongoDB';
import { ENV } from 'configs/env';
import { app } from './app';
const PORT = ENV.PORT || '3500';

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
