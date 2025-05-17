import { PostModel } from './posts-model';

export class PostsService {
  static async getPost(id: number) {
    const result = await PostModel.findById(id);
    if (!result) throw new Error('Post not found');
    return result;
  }

  static async getAllPost() {
    const result = await PostModel.find();
    if (!result) throw new Error('No posts found');
    return result;
  }

  static async addPost(caption: string, imageUrl: string, creator: string) {
    const result = await PostModel.create({
      caption,
      imageUrl,
      creator,
    });
    if (!result) throw new Error('Failed to create post');
    return result._id.toString();
  }

  static async updatePostCaption(id: string, caption: string) {
    const result = await PostModel.findByIdAndUpdate(id, { caption });
    if (!result) throw new Error('Post not found');
    return result._id.toString();
  }

  static async deletePost(id: string) {
    const result = await PostModel.findByIdAndDelete(id);
    if (!result) throw new Error('Post not found');
    return result._id.toString();
  }
}
