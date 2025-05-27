import { PostsService } from 'apis/posts/posts-service';
import { CustomError } from 'utils/error';
import { CommentModel } from './comment-model';

export class CommentService {
  static async createComment(content: string, creator: string, postId: string) {
    const result = await CommentModel.create({
      content,
      creator,
      postId,
    });
    await PostsService.incrementCommentCount(postId);
    return result._id.toString();
  }

  static async deleteComment(id: string) {
    const result = await CommentModel.findByIdAndDelete(id);
    if (!result)
      throw new CustomError('RESOURCE_NOT_FOUND', 'Comment not found');

    await PostsService.decreamentCommentCount(result.postId.toString());
    return result._id.toString();
  }

  static async getPostComments(postId: string) {
    const result = await CommentModel.find({ postId }).populate(
      'creator',
      'username profileImage',
    );
    return result;
  }

  static async deleteCommentsByPostId(postId: string) {
    await CommentModel.deleteMany({ postId });
  }
}
