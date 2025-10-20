import fs from 'fs';
import path from 'path';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { ENV } from 'configs/env';
import { storageBucket } from 'configs/storage-bucket';
import { CustomError } from './error';

type Folders = 'profile-images' | 'posts';

export class CloudStorage {
  static async uploadFile(filePath: string, uploadFolder: Folders) {
    const SAFE_UPLOAD_DIR = '/tmp'; // adjust if Multer uses another directory
    try {
      // Validate that filePath is contained in SAFE_UPLOAD_DIR
      const resolvedFilePath = path.resolve(filePath);
      if (!resolvedFilePath.startsWith(path.resolve(SAFE_UPLOAD_DIR) + path.sep)) {
        throw new CustomError('BAD_REQUEST', 'Invalid file path');
      }
      const fileContent = fs.readFileSync(resolvedFilePath);

      // create filename
      const originalName =
        filePath.split('/').pop() || filePath.split('\\').pop() || 'file';
      const timestamp = Date.now();
      const ext = originalName.includes('.')
        ? originalName.substring(originalName.lastIndexOf('.'))
        : '';
      const baseName = originalName
        .replace(ext, '')
        .replace(/[^a-zA-Z0-9_-]/g, '');
      const fileName = `${uploadFolder}/${baseName}-${timestamp}${ext}`;

      const params: PutObjectRequest = {
        Bucket: ENV.STORAGE_BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
      };
      const result = await storageBucket.upload(params).promise();
      fs.unlinkSync(resolvedFilePath);
      return {
        url: result.Location,
        fileName: result.Key,
      };
    } catch (error) {
      try {
        const resolvedFilePath = path.resolve(filePath);
        if (resolvedFilePath.startsWith(path.resolve(SAFE_UPLOAD_DIR) + path.sep)) {
          fs.unlinkSync(resolvedFilePath);
        }
      } catch (_) {
        // swallow error
      }
      throw new CustomError('INTERNAL_SERVER_ERROR', 'Failed to upload file');
    }
  }

  static async deleteFile(fileUrl: string) {
    try {
      const url = new URL(fileUrl);
      let key = url.pathname;
      if (key.startsWith('/')) key = key.slice(1);

      await storageBucket
        .deleteObject({
          Bucket: ENV.STORAGE_BUCKET_NAME,
          Key: key,
        })
        .promise();
      return key;
    } catch (error) {
      throw new CustomError('INTERNAL_SERVER_ERROR', 'Failed to delete file');
    }
  }
}
