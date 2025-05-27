import { model, Schema, SchemaTypes } from 'mongoose';
import { getCommonJsonTransformConfig } from 'utils/common';
import { LikeService } from 'apis/likes/like-service';
import { CommentService } from 'apis/comments/comment-service';
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
  { timestamps: true, toJSON: getCommonJsonTransformConfig() },
);

// Hook to delete comments and likes before a post is deleted
postSchema.pre('findOneAndDelete', async function (next) {
  const docToDelete = await this.model.findOne(this.getQuery());
  if (docToDelete) {
    const postId = docToDelete._id.toString();
    await CommentService.deleteCommentsByPostId(postId);
    await LikeService.deleteLikesByPostId(postId);
  }
  next();
});

export const PostModel = model('Post', postSchema);
