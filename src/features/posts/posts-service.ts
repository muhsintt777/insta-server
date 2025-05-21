import { CustomError } from 'utils/error';
import { PostModel } from './posts-model';

export class PostsService {
  static async getPost(id: string) {
    const result = await PostModel.findById(id);
    if (!result) throw new CustomError('RESOURCE_NOT_FOUND', 'Post not found');
    return result;
  }

  static async getAllPost() {
    const result = await PostModel.find();
    return result;
  }

  static async getCurrentUserPosts(userId: string) {
    const result = await PostModel.find({ creator: userId });
    return result;
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
}
