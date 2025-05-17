import { z, ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  return (
    payload.issues.map((err) => err.message).join(', ') || 'Validation failed'
  );
};

export const validateId = (id: any): string => {
  const idSchema = z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be string',
  });
  return idSchema.parse(id);
};
