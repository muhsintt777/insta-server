import { z } from 'zod';

export const createPostSchema = z.object({
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be string',
    })
    .trim(),
  image: z.string({ required_error: 'Image is required' }),
});

export const updatePostCaptionSchema = z.object({
  id: z.string({
    required_error: 'Post ID is required',
    invalid_type_error: 'Post ID must be string',
  }),
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be string',
    })
    .trim(),
});
