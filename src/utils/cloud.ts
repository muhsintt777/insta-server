import fs from 'fs';
import AWS from 'aws-sdk';
import { ENV } from 'configs/env';
import { CustomError } from './error';

const s3 = new AWS.S3({
  accessKeyId: ENV.STORAGE_BUCKET_ACC_KEY,
  secretAccessKey: ENV.STORAGE_BUCKET_SEC_KEY,
  region: ENV.STORAGE_BUCKET_REGION,
  signatureVersion: 'v4',
});

export async function uploadToCloud(filePath: string) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: ENV.STORAGE_BUCKET_NAME,
      Key: `${Date.now()}-${filePath.split('/').pop()}`, // Unique file name
      Body: fileContent,
    };
    const result = await s3.upload(params).promise();

    fs.unlinkSync(filePath);
    return {
      url: result.Location,
      fileName: result.Key,
    };
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new CustomError('INTERNAL_SERVER_ERROR', 'Failed to upload file');
  }
}
