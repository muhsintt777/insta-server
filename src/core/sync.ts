import { PostModel } from 'apis/posts/posts-model';
import { UserModel } from 'apis/users/user-model';
import { Router } from 'express';

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
      await UserModel.findByIdAndUpdate(user._id, { postCount });
      syncedUserCount++;
      console.log(`${i} - User: ${user._id}, postCount: ${postCount}`);
    }

    console.log('Syncing users completed.');
    res.status(200).json({ syncedUserCount });
  } catch (error) {
    console.error('Error in /sync/users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  return;
});

router.post('/posts', async (req, res) => {
  try {
    console.log('Syncing posts...');
    res.status(200).json({ message: 'Syncing posts started' });
  } catch (error) {
    console.error('Error in /sync/posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  return;
});

export { router as syncRouter };
