import { z } from 'zod';
import { validateId } from 'utils/common';

export const createCommentSchama = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .trim()
    .min(1, 'Content is too small'),
  postId: z.string({ required_error: 'PostId is required' }).refine(
    (val) => {
      return validateId(val, true).isValid;
    },
    { message: 'Invalid post ID' },
  ),
  creator: z.string().refine(
    (val) => {
      return validateId(val, true).isValid;
    },
    { message: 'Invalid creator ID' },
  ),
});

export const updateCommentSchema = z.object({
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .trim()
    .min(1, 'Content is too small'),
});
