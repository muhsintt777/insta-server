import { Request } from 'express';
import { CustomError } from './error';

export const fileUploadValidation = (req: Request, key: string) => {
  const path =
    (req.files as { [fieldname: string]: Express.Multer.File[] })?.[key]?.[0]
      ?.path || null;
  if (!path) throw new CustomError('VALIDATION_ERROR', `${key} is required`);
  return path;
};
