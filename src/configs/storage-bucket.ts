import { S3 } from "aws-sdk";
const ACCESS_KEY = process.env.STORAGE_BUCKET_ACC_KEY;
const SECRET_KEY = process.env.STORAGE_BUCKET_SEC_KEY;
const REGION = process.env.STORAGE_BUCKET_REGION;

export const storageBucket = new S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
  signatureVersion: "v4",
});
