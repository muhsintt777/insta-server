import fs from 'fs';
import { ENV } from 'configs/env';
import { CustomError } from './error';
import { storageBucket } from 'configs/storage-bucket';

export async function uploadToCloud(filePath: string) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: ENV.STORAGE_BUCKET_NAME,
      Key: `${Date.now()}-${filePath.split('/').pop()}`,
      Body: fileContent,
    };
    const result = await storageBucket.upload(params).promise();
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
