import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from 'configs/env';
import { CustomError } from './error';

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export async function uploadToCloud(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new CustomError('INTERNAL_SERVER_ERROR', 'Failed to upload file');
  }
}
