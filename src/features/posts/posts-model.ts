import { model, Schema, SchemaTypes } from 'mongoose';
import { PostCreateAttributes } from './posts';

const postSchema = new Schema<PostCreateAttributes>(
  {
    image: {
      type: SchemaTypes.String,
    },
    caption: {
      type: SchemaTypes.String,
      required: true,
    },
    creator: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    likeCount: {
      type: SchemaTypes.Number,
      default: 0,
    },
    commentCount: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const PostModel = model('Post', postSchema);
