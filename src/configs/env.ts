export const ENV = {
  SERVER_TYPE: process.env.SERVER_TYPE as 'DEV' | 'PROD',
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string,
  COOKIE_EXPIRY_IN_DAYS: process.env.COOKIE_EXPIRY_IN_DAYS as string,
};
