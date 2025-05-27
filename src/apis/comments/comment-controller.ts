import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { validateId } from 'utils/common';
import { createCommentSchama, updateCommentSchema } from './comment-validation';
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

  static async updateComment(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    const { content } = updateCommentSchema.parse(req.body);
    const result = await CommentService.updateComment(id, content);

    res
      .status(200)
      .json(new ApiResponse({ id: result }, 'Comment updated successfully'));
  }

  static async deleteComment(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    const result = await CommentService.deleteComment(id);

    res
      .status(200)
      .json(new ApiResponse({ id: result }, 'Comment deleted successfully'));
  }

  static async getPostComments(req: Request, res: Response) {
    const postId = validateId(req.params.postId).id;
    const result = await CommentService.getPostComments(postId);

    res
      .status(200)
      .json(new ApiResponse(result, 'Comments fetched successfully'));
  }
}
