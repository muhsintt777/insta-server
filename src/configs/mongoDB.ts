import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) throw new Error('no db url found');
    await mongoose.connect(ENV.MONGO_URI, {
      dbName: 'test',
    });
    console.log(`mongoDB connected`);
  } catch (err) {
    console.log('mongodb connection failed', err);
    process.exit(1);
  }
};
