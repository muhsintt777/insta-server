process.env.ACCESS_TOKEN_KEY = 'mock_access_key';
process.env.REFRESH_TOKEN_KEY = 'mock_refresh_key';
process.env.ACCESS_TOKEN_EXPIRY = '1h';
process.env.REFRESH_TOKEN_EXPIRY = '7d';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   await mongoose.connect(uri);
// });

// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });
