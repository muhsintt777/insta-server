import { z } from 'zod';

export const createPostSchema = z.object({
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be string',
    })
    .trim(),
});

export const updatePostCaptionSchema = z.object({
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be string',
    })
    .trim(),
});
