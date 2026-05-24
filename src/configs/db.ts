import dns from 'dns';
import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) throw new Error('no db url found');

    // Ensure Node can resolve MongoDB Atlas SRV records.
    dns.setServers(['8.8.8.8', '1.1.1.1']);

    await mongoose.connect(ENV.MONGO_URI, {
      dbName: 'test',
    });
    console.log(`mongoDB connected`);
  } catch (err) {
    console.log('mongodb connection failed', err);
    process.exit(1);
  }
};
