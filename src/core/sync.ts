import { Router } from 'express';
import { FriendModel } from 'apis/friends/friend-model';
import { LikeModel } from 'apis/likes/like-model';
import { PostModel } from 'apis/posts/posts-model';
import { UserModel } from 'apis/users/user-model';
import { CommentModel } from 'apis/comments/comment-model';

const router = Router();

router.post('/users', async (req, res) => {
  try {
    console.log('Syncing users...');

    let syncedUserCount = req.body.syncedUserCount || 0;
    const totalUsers = await UserModel.countDocuments();
    const remainingUsers = totalUsers - syncedUserCount;
    console.log({ totalUsers, syncedUserCount, remainingUsers });

    for (let i = 1; i <= remainingUsers; i++) {
      const user = await UserModel.findOne().skip(syncedUserCount).lean();
      if (!user) break;
      const postCount = await PostModel.countDocuments({ creator: user._id });
      const friendsCount = await FriendModel.countDocuments({
        status: 'ACCEPTED',
        $or: [{ userId1: user._id }, { userId2: user._id }],
      });
      await UserModel.findByIdAndUpdate(user._id, { postCount, friendsCount });
      syncedUserCount++;
      console.log(
        `${i} - User: ${user._id}, postCount: ${postCount}, friendsCount: ${friendsCount}`,
      );
    }

    console.log('Syncing users completed.', { syncedUserCount });
    res.status(200).json({ syncedUserCount, totalUsers });
  } catch (error) {
    console.error('Error in /sync/users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  return;
});

router.post('/posts', async (req, res) => {
  try {
    console.log('Syncing posts...');
    let syncedPostCount = req.body.syncedPostCount || 0;
    const totalPosts = await PostModel.countDocuments();
    const remainingPosts = totalPosts - syncedPostCount;
    console.log({ totalPosts, syncedPostCount, remainingPosts });

    for (let i = 1; i <= remainingPosts; i++) {
      const post = await PostModel.findOne().skip(syncedPostCount).lean();
      if (!post) break;
      const likeCount = await LikeModel.countDocuments({ postId: post._id });
      const commentCount = await CommentModel.countDocuments({
        postId: post._id,
      });
      await PostModel.findByIdAndUpdate(post._id, { likeCount, commentCount });
      syncedPostCount++;
      console.log(`${i} - Post: ${post._id}, likeCount: ${likeCount}`);
    }
    console.log('Syncing posts completed.', { syncedPostCount });

    res.status(200).json({ syncedPostCount, totalPosts });
  } catch (error) {
    console.error('Error in /sync/posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  return;
});

router.post('/normalise', async (req, res) => {
  try {
    console.log('Normalizing user bios...');
    // const result = await UserModel.updateMany(
    //   { bio: null },
    //   { $set: { bio: '' } },
    // );
    // console.log(
    //   `Matched ${result.matchedCount}, Modified: ${result.modifiedCount}`,
    // );

    console.log('Normalization completed.');
    res.status(200).json({ message: 'Normalization completed' });
  } catch (error) {
    console.error('Error in /sync/normalise:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  return;
});

export { router as syncRouter };
