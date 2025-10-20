import { PostsService } from 'apis/posts/posts-service';
import { CustomError } from 'utils/error';
import { validateId, validateMultipleIds } from 'utils/common';
import { LikeModel } from './like-model';
import { CreateLikeParam } from './likes';

export class LikeService {
  static async createLike(params: CreateLikeParam) {
    const [postId, userId] = validateMultipleIds(params.postId, params.userId);
    const existingLike = await LikeModel.findOne({
      postId,
      likedBy: userId,
    });
    if (existingLike) {
      throw new CustomError(
        'RESOURCE_CONFLICT',
        'User has already liked this post',
      );
    }

    const result = await LikeModel.create({
      postId,
      likedBy: userId,
    });
    await PostsService.updateLikeCount(postId, 'INCREMENT');
    return result._id.toString();
  }

  static async getUserLikedPostIds(userId: string, postIds: string[]) {
    const likes = await LikeModel.find({
      postId: { $in: postIds },
      likedBy: userId,
    })
      .select('postId')
      .lean();

    if (!likes.length) return [];
    return likes;
  }

  static async deleteLike(postId: string, userId: string) {
    await LikeModel.deleteOne({ postId, likedBy: userId });
    await PostsService.updateLikeCount(postId, 'DECREMENT');
  }

  static async getPostLikes(postId: string) {
    const likes = await LikeModel.find({ postId }).populate(
      'likedBy',
      'username',
    );
    if (!likes)
      throw new CustomError(
        'RESOURCE_NOT_FOUND',
        'No likes found for this post',
      );
    return likes;
  }

  static async deleteAllLikesForPost(postId: string) {
    await LikeModel.deleteMany({ postId });
  }
}
