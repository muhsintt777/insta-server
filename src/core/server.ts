import * as dotenv from 'dotenv';
dotenv.config();

import { ENV } from 'configs/env';
import { app } from './app';
import { connectDB } from 'configs/db';

async function startServer() {
  try {
    await connectDB();
    app.listen(ENV.PORT || 3500, () => {
      console.log(`Server started at ${ENV.PORT || 3500}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

startServer();
