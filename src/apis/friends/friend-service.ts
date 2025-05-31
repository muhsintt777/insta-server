import { CustomError } from 'utils/error';
import { FriendModel } from './friend-model';

export class FriendService {
  static async getFriendShipDetails(userId1: string, userId2: string) {
    const friend = await FriendModel.findOne({
      $or: [
        { userId1, userId2 },
        { userId1: userId2, userId2: userId1 },
      ],
    });
    if (!friend) {
      throw new CustomError('RESOURCE_NOT_FOUND', 'Friendship not found');
    }

    return friend || null;
  }

  static async getFriends(userId: string) {
    const friends = await FriendModel.find({
      $or: [{ userId1: userId }, { userId2: userId }],
      status: 'ACCEPTED',
    }).populate('userId1 userId2', 'username email profilePicture');
    return friends;
  }

  static async getFriendRequests(userId: string) {
    const friendRequests = await FriendModel.find({
      userId2: userId,
      status: 'PENDING',
    }).populate('userId1', 'username email profilePicture');

    return friendRequests;
  }

  static async createFriend(currentUserId: string, userId: string) {
    const isFriend = await FriendModel.findOne({
      $or: [
        { userId1: currentUserId, userId2: userId },
        { userId1: userId, userId2: currentUserId },
      ],
    });
    if (isFriend)
      throw new CustomError('RESOURCE_CONFLICT', 'Friendship already exists');

    const friend = await FriendModel.create({
      userId1: currentUserId,
      userId2: userId,
    });
    return friend._id.toString();
  }

  static async acceptFriendRequest(id: string, currentUserId: string) {
    const friend = await FriendModel.findOneAndUpdate(
      { _id: id, status: 'PENDING', userId2: currentUserId },
      { status: 'ACCEPTED' },
      { new: true },
    );
    if (!friend)
      throw new CustomError(
        'BAD_REQUEST',
        'Friend request not found or already handled',
      );

    return friend._id.toString();
  }

  static async rejectFriendRequest(id: string, currentUserId: string) {
    const friend = await FriendModel.findOneAndUpdate(
      { _id: id, status: 'PENDING', userId2: currentUserId },
      { status: 'REJECTED' },
      { new: true },
    );
    if (!friend)
      throw new CustomError(
        'BAD_REQUEST',
        'Friend request not found or already handled',
      );

    return friend._id.toString();
  }

  static async deleteFriend(friendShipId: string, currentUserId: string) {
    const friend = await FriendModel.findOneAndDelete({
      _id: friendShipId,
      $or: [{ userId1: currentUserId }, { userId2: currentUserId }],
    });
    if (!friend) {
      throw new CustomError(
        'FORBIDDEN',
        'You can only delete friendships you are part of',
      );
    }
    return friend._id.toString();
  }
}
