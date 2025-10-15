export const ENV = {
  SERVER_TYPE: process.env.SERVER_TYPE as 'DEV' | 'PROD' | 'TEST',
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string, //15m
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string, //7d
  COOKIE_EXPIRY_IN_DAYS: process.env.COOKIE_EXPIRY_IN_DAYS as string, //1
  STORAGE_BUCKET_REGION: process.env.STORAGE_BUCKET_REGION as string,
  STORAGE_BUCKET_ACC_KEY: process.env.STORAGE_BUCKET_ACC_KEY as string,
  STORAGE_BUCKET_SEC_KEY: process.env.STORAGE_BUCKET_SEC_KEY as string,
  STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME as string,
  CORS_ALLOWED_ORIGINS: [
    'https://insta-client-prod.onrender.com',
  ],
};
