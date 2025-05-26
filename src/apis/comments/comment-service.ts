import { PostsService } from 'apis/posts/posts-service';
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
}
