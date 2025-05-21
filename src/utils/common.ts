import { isValidObjectId } from 'mongoose';
import { z, ZodError } from 'zod';
import { CustomError } from './error';

export const getZodErrMessage = (payload: ZodError): string => {
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: any): string => {
  if (isValidObjectId(id)) return id;
  throw new CustomError('VALIDATION_ERROR', 'Invalid ID');
};
