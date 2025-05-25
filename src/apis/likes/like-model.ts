import { model, Schema, SchemaTypes } from 'mongoose';
import { LikeCreateAttributes } from './likes';
import { getCommonJsonTransformConfig } from 'utils/common';

const likeSchema = new Schema<LikeCreateAttributes>(
  {
    postId: {
      type: SchemaTypes.ObjectId,
      ref: 'Post',
      required: true,
    },
    likedBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: getCommonJsonTransformConfig(),
  },
);

export const LikeModel = model('Like', likeSchema);
