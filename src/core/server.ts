import * as dotenv from 'dotenv';
dotenv.config();

import { existsSync, mkdirSync } from 'fs';
import { ENV } from 'configs/env';
import { connectDB } from 'configs/db';
import { app } from './app';

const TEMP_DIR = 'public/temp';
const port = ENV.PORT || 3500;

function validateEnv() {
  Object.entries(ENV).forEach(([key, value]) => {
    if (value === undefined) {
      throw new Error(`ENV variable <${key}> is not set`);
    }
  });
}

async function startServer() {
  try {
    validateEnv();
    // create file upload directory
    if (!existsSync(TEMP_DIR)) {
      mkdirSync(TEMP_DIR, { recursive: true });
      console.log('Temporary directory created at public/temp');
    }

    await connectDB();

    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    });
  } catch (err) {
    console.error('Unable to start server: ', err.message);
    process.exit(1);
  }
}

startServer();
