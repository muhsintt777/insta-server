// jest.setup.js
// Set environment variables globally for all tests
process.env.SERVER_TYPE = 'TEST';
process.env.PORT = '3000';
process.env.MONGO_URI = 'mongodb://localhost:27017/test';
process.env.ACCESS_TOKEN_KEY = 'test-access-key';
process.env.ACCESS_TOKEN_EXPIRY = '15m';
process.env.REFRESH_TOKEN_KEY = 'test-refresh-key';
process.env.REFRESH_TOKEN_EXPIRY = '7d';
process.env.STORAGE_BUCKET_REGION = 'us-east-1';
process.env.STORAGE_BUCKET_ACC_KEY = 'test-acc-key';
process.env.STORAGE_BUCKET_SEC_KEY = 'test-sec-key';
process.env.STORAGE_BUCKET_NAME = 'test-bucket';
