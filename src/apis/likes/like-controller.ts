import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { validateId } from 'utils/common';
import { LikeService } from './like-service';

export class LikeController {
  static async createLike(req: Request, res: Response) {
    const userId = req.token?.userId!;
    const postId = validateId(req.body.postId).id;
    const result = await LikeService.createLike(postId, userId);

    res
      .status(201)
      .json(new ApiResponse({ id: result }, 'Like created successfully'));
  }

  static async deleteLike(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    await LikeService.deleteLike(id);

    res.status(200).json(new ApiResponse(null, 'Like deleted successfully'));
  }

  static async getPostLikes(req: Request, res: Response) {
    const postId = validateId(req.params.postId).id;
    const likes = await LikeService.getPostLikes(postId);

    res.status(200).json(new ApiResponse(likes));
  }
}
