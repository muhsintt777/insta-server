import { S3 } from 'aws-sdk';
import { ENV } from 'configs/env';

export const storageBucket = new S3({
  accessKeyId: ENV.STORAGE_BUCKET_ACC_KEY,
  secretAccessKey: ENV.STORAGE_BUCKET_SEC_KEY,
  region: ENV.STORAGE_BUCKET_REGION,
  signatureVersion: 'v4',
});
