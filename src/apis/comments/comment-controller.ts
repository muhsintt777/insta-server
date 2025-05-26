import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { createCommentSchama } from './comment-validation';
import { CommentService } from './comment-service';

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const { content, postId, creator } = createCommentSchama.parse({
      ...req.body,
      creator: req.token?.userId,
    });
    const result = await CommentService.createComment(content, creator, postId);

    res
      .status(201)
      .json(new ApiResponse({ id: result }, 'Comment created successfully'));
  }
}
