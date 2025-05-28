import { CustomError } from 'utils/error';
import { FriendModel } from './friend-model';

export class FriendService {
  static async checkFriendship(userId1: string, userId2: string) {
    const friend = await FriendModel.findOne({
      $or: [
        { userId1, userId2 },
        { userId1: userId2, userId2: userId1 },
      ],
    });

    return friend?._id.toString() || null;
  }

  static async getFriends(userId: string) {
    const friends = await FriendModel.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    }).populate('userId1 userId2', 'username email profilePicture');
    return friends;
  }

  static async createFriend(userId1: string, userId2: string) {
    const isFriend = await FriendModel.findOne({
      $or: [
        { userId1, userId2 },
        { userId1: userId2, userId2: userId1 },
      ],
    });
    if (isFriend)
      throw new CustomError('RESOURCE_CONFLICT', 'Friendship already exists');

    const friend = await FriendModel.create({ userId1, userId2 });
    return friend._id.toString();
  }

  static async deleteFriend(id: string) {
    const friend = await FriendModel.findByIdAndDelete(id);
    if (!friend) {
      throw new CustomError('RESOURCE_NOT_FOUND', 'Friendship not found');
    }
    return friend._id.toString();
  }
}
