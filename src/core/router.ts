import { Router } from 'express';
import { authRouter } from 'apis/auth/auth-routes';
import { postsRouter } from 'apis/posts/posts-routes';
import { userRouter } from 'apis/users/user-routes';
import { LikeRouter } from 'apis/likes/like-routes';
import { commentRouter } from 'apis/comments/comment-routes';
import { friendRouter } from 'apis/friends/friend-routes';
import { wheatherRouter } from 'apis/wheather/wheather-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/likes', LikeRouter);
router.use('/comments', commentRouter);
router.use('/friends', friendRouter);
router.use('/weather', wheatherRouter);

export { router as appRouter };
