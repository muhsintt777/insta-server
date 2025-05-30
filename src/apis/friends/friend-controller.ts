import { Request, Response } from 'express';
import { validateId } from 'utils/common';
import { ApiResponse } from 'utils/api-response';
import { CustomError } from 'utils/error';
import { FriendService } from './friend-service';

export class FriendController {
  static async getFriendShipDetails(req: Request, res: Response) {
    const [userId, currentUserId] = [
      validateId(req.params.userId).id,
      validateId(req.token?.userId).id,
    ];
    const result = await FriendService.getFriendShipDetails(
      userId,
      currentUserId,
    );

    res
      .status(200)
      .json(new ApiResponse(result, 'Friendship details fetched successfully'));
  }

  static async getFriends(req: Request, res: Response) {
    const userId = validateId(req.token?.userId).id;
    const result = await FriendService.getFriends(userId);

    if (!result.length) {
      res.status(204).json(new ApiResponse([], 'No friends found'));
      return;
    }
    res
      .status(200)
      .json(new ApiResponse(result, 'Friends fetched successfully'));
  }

  static async createFriend(req: Request, res: Response) {
    const currentUserId = validateId(req.token?.userId).id;
    const userId = validateId(req.body.userId).id;
    if (currentUserId === userId) {
      throw new CustomError('BAD_REQUEST', 'Cannot befriend yourself');
    }
    const result = await FriendService.createFriend(currentUserId, userId);

    res
      .status(201)
      .json(new ApiResponse(result, 'Friend request sent successfully'));
  }

  static async acceptFriendRequest(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    const currentUserId = validateId(req.token?.userId).id;
    const result = await FriendService.acceptFriendRequest(id, currentUserId);

    res
      .status(200)
      .json(new ApiResponse(result, 'Friend request accepted successfully'));
  }

  static async rejectFriendRequest(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    const currentUserId = validateId(req.token?.userId).id;
    const result = await FriendService.rejectFriendRequest(id, currentUserId);

    res
      .status(200)
      .json(new ApiResponse(result, 'Friend request rejected successfully'));
  }

  static async deleteFriend(req: Request, res: Response) {
    const id = validateId(req.params.id).id;
    const currentUserId = validateId(req.token?.userId).id;
    const result = await FriendService.deleteFriend(id, currentUserId);

    res
      .status(200)
      .json(new ApiResponse(result, 'Friendship deleted successfully'));
  }
}
