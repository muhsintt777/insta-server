import * as dotenv from 'dotenv';
dotenv.config();

import { ENV } from 'configs/env';
import { app } from './app';
import { connectDB } from 'configs/db';

async function startServer() {
  try {
    await connectDB();
    const port = ENV.PORT || 3500;
    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    });
  } catch (err) {
    console.error('Unable to start server: ', err.message);
    process.exit(1);
  }
}

startServer();
