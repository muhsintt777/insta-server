import { z } from 'zod';
import { REGEX } from 'configs/constants';

export const CreateUserReqSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
    })
    .trim()
    .regex(REGEX.email, 'Email is not valid'),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be string',
    })
    .trim()
    .regex(REGEX.username, 'Invalid username'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    })
    .trim()
    .regex(REGEX.password, 'Password is not valid'),
  fullName: z
    .string({
      required_error: 'Full name is required',
      invalid_type_error: 'Full name must be string',
    })
    .trim()
    .regex(REGEX.fullName, 'Full name is not valid')
    .max(100, 'Full name must be less than 100 characters'),
});

export const editUserReqSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .regex(REGEX.fullName, 'Full name is not valid')
      .max(100, 'Full name must be less than 100 characters')
      .optional(),
    bio: z
      .string()
      .trim()
      .max(200, 'Bio must be less than 200 characters')
      .optional(),
  })
  .refine((data) => data.fullName || data.bio || data.bio === '', {
    message: 'Either fullName or bio is required',
    path: ['fullName', 'bio'],
  });

export type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;
export type EditUserReqType = z.infer<typeof editUserReqSchema>;

export const UserIdSchema = z
  .string({
    required_error: 'Id required',
    invalid_type_error: 'Invalid type',
  })
  .trim();
