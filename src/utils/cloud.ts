import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { ApiError } from './api-error';
import { ENV } from 'configs/env';

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
    throw new ApiError(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      'File upload failed',
      'INTERNAL_SERVER_ERROR',
    );
  }
}
