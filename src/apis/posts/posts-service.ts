import { CustomError } from 'utils/error';
import { PostModel } from './posts-model';
import { LikeService } from 'apis/likes/like-service';

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

  static async getPost(id: string) {
    const result = await PostModel.findById(id).populate(
      this.getCreatorPopulateConfig(),
    );
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
    return result;
  }

  static async getAllPost() {
    const result = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate(this.getCreatorPopulateConfig());
    return result;
  }

  static async getCurrentUserPosts(userId: string) {
    const posts = await PostModel.find({ creator: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate(this.getCreatorPopulateConfig())
      .lean();
    if (!posts.length) return [];

    const postIds = posts.map((p: any) => p._id);
    const likes = await LikeService.getUserLikedPostIds(userId, postIds);
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
    const result = await PostModel.findByIdAndDelete(id);
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
    return result._id.toString();
  }

  static async updateLikeCount(id: string, type: 'INCREMENT' | 'DECREMENT') {
    const result = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { likeCount: type === 'INCREMENT' ? 1 : -1 } },
      { new: true },
    );
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
  }

  static async updateCommentCount(id: string, type: 'INCREMENT' | 'DECREMENT') {
    const result = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { commentCount: type === 'INCREMENT' ? 1 : -1 } },
      { new: true },
    );
    if (!result) throw new CustomError('RESOURCE_CONFLICT', 'Post not found');
  }
}
