import { isObjectIdOrHexString, isValidObjectId } from 'mongoose';
import { ZodError } from 'zod';
import { CustomError } from './error';

export const getZodErrMessage = (payload: ZodError): string => {
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: any, safe: boolean = false) => {
  const isValid = isValidObjectId(id);
  if (!safe && !isValid) {
    throw new CustomError('VALIDATION_ERROR', 'Invalid ID');
  }
  return { id, isValid } as { id: string; isValid: boolean };
};

export const validateMultipleIds = (...ids: string[]) => {
  ids.forEach((id) => {
    if (!isObjectIdOrHexString(id)) {
      throw new CustomError('VALIDATION_ERROR', `Invalid ID`);
    }
  });
  return ids;
};

export const getCommonJsonTransformConfig = (
  transform?: (_doc: any, ret: any) => void,
) => {
  return {
    virtuals: true,
    versionKey: false,
    transform: (_doc: any, ret: any) => {
      // additional transformations
      transform?.(_doc, ret);

      // common transformations
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  };
};
