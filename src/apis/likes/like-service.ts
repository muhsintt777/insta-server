import { PostsService } from 'apis/posts/posts-service';
import { LikeModel } from './like-model';
import { CustomError } from 'utils/error';

export class LikeService {
  static async createLike(postId: string, userId: string) {
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
    await PostsService.incrementLikeCount(postId);
    return result._id.toString();
  }

  static async deleteLike(id: string) {
    const like = await LikeModel.findById(id);
    if (!like) throw new CustomError('RESOURCE_NOT_FOUND', 'Like not found');
    const postId = like.postId.toString();
    await LikeModel.deleteOne({ _id: id });
    await PostsService.decrementLikeCount(postId);
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

  static async deleteLikesByPostId(postId: string) {
    await LikeModel.deleteMany({ postId });
  }
}
