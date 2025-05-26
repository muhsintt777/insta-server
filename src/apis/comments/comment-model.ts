import { model, Schema, SchemaTypes } from 'mongoose';
import { getCommonJsonTransformConfig } from 'utils/common';
import { CommentCreateAttributes } from './comments';

const commentSchema = new Schema<CommentCreateAttributes>(
  {
    content: {
      type: SchemaTypes.String,
      required: true,
    },
    creator: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: SchemaTypes.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true, toJSON: getCommonJsonTransformConfig() },
);

export const CommentModel = model('Comment', commentSchema);
