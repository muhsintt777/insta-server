import fs from 'fs';
import { ENV } from 'configs/env';
import { CustomError } from './error';
import { storageBucket } from 'configs/storage-bucket';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

type Folders = 'profile-images' | 'posts';

export async function uploadToCloud(filePath: string, uploadFolder: Folders) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const params: PutObjectRequest = {
      Bucket: ENV.STORAGE_BUCKET_NAME,
      Key: `${uploadFolder}/${Date.now()}-${filePath.split('/').pop()}`,
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
