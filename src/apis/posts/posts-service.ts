import { CustomError } from 'utils/error';
import { validateId } from 'utils/common';
import { LikeService } from 'apis/likes/like-service';
import { UserModel } from 'apis/users/user-model';
import { PostModel } from './posts-model';

export class PostsService {
  private static getCreatorPopulateConfig() {
    return {
      path: 'creator',
      select: 'username fullName profileImage',
      transform: (doc: any) => {
        if (doc) {
          return {
            id: doc._id,
            username: doc.username,
            fullName: doc.fullName,
            profileImage: doc.profileImage || null,
          };
        }
        return doc;
      },
    };
  }

  static async getPost(postId: string) {
    const { id } = validateId(postId);

    const result = await PostModel.findById(id).populate(
      this.getCreatorPopulateConfig(),
    );
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
    return result;
  }

  static async getAllPost(userId: string) {
    const { id } = validateId(userId);
    const result = await PostModel.find()
      .sort({ createdAt: -1, _id: -1 })
      .limit(10)
      .populate(this.getCreatorPopulateConfig())
      .lean();

    if (!result.length) return [];

    const postIds = result.map((p: any) => p._id);
    const likes = await LikeService.getUserLikedPostIds(id, postIds);
    const likedSet = new Set(likes.map((l: any) => l.postId.toString()));

    result.forEach((p: any) => {
      p.isLiked = likedSet.has(p._id.toString());
      p.id = p._id;
      delete p._id;
      delete p.__v;
    });
    return result;
  }

  static async getCurrentUserPosts(userId: string) {
    const { id } = validateId(userId);
    const posts = await PostModel.find({ creator: id })
      .sort({ createdAt: -1, _id: -1 })
      .limit(10)
      .populate(this.getCreatorPopulateConfig())
      .lean();
    if (!posts.length) return [];

    const postIds = posts.map((p: any) => p._id);
    const likes = await LikeService.getUserLikedPostIds(id, postIds);
    const likedSet = new Set(likes.map((l: any) => l.postId.toString()));

    posts.forEach((p: any) => {
      p.isLiked = likedSet.has(p._id.toString());
      p.id = p._id;
      delete p._id;
      delete p.__v;
    });
    return posts;
  }

  static async addPost(caption: string, imageUrl: string, creator: string) {
    const result = await PostModel.create({
      caption,
      creator,
      image: imageUrl,
    });
    await UserModel.findByIdAndUpdate(creator, {
      $inc: { postCount: 1 },
    });

    if (!result)
      throw new CustomError('INTERNAL_SERVER_ERROR', 'Failed to create post');
    return result._id.toString();
  }

  static async updatePostCaption(id: string, caption: string) {
    const result = await PostModel.findByIdAndUpdate(id, { caption });
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
    return result._id.toString();
  }

  static async deletePost(id: string) {
    const result = await PostModel.findByIdAndDelete(id).select('creator');
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');

    await UserModel.findByIdAndUpdate(result.creator, {
      $inc: { postCount: -1 },
    });

    return result._id.toString();
  }

  static async updateLikeCount(
    postId: string,
    type: 'INCREMENT' | 'DECREMENT',
  ) {
    const { id } = validateId(postId);
    const result = await PostModel.findByIdAndUpdate(id, {
      $inc: { likeCount: type === 'INCREMENT' ? 1 : -1 },
    });
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
  }

  static async updateCommentCount(
    postId: string,
    type: 'INCREMENT' | 'DECREMENT',
  ) {
    const { id } = validateId(postId);
    const result = await PostModel.findByIdAndUpdate(id, {
      $inc: { commentCount: type === 'INCREMENT' ? 1 : -1 },
    });
    if (!result) throw new CustomError('RESOURCE_CONFLICT', 'Post not found');
  }
}
