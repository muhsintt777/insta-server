import { model, Schema, SchemaTypes } from 'mongoose';
import { getCommonJsonTransformConfig } from 'utils/common';
import { CloudStorage } from 'utils/cloud-storage';
import { CommentService } from 'apis/comments/comment-service';
import { LikeService } from 'apis/likes/like-service';
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

postSchema.index({ createdAt: -1, _id: -1 });

// Hook to delete comments and likes before a post is deleted
postSchema.pre('findOneAndDelete', async function (next) {
  const docToDelete = await this.model.findOne(this.getQuery());
  if (docToDelete) {
    const postId = docToDelete._id.toString();

    // Delete related comments, likes, files
    await CommentService.deleteCommentsByPostId(postId);
    await LikeService.deleteAllLikesForPost(postId);
    if (docToDelete.image) {
      await CloudStorage.deleteFile(docToDelete.image);
    }
  }
  next();
});

export const PostModel = model('Post', postSchema);
