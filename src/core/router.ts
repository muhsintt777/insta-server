import { Router } from 'express';
import { authRouter } from 'apis/auth/auth-routes';
import { postsRouter } from 'apis/posts/posts-routes';
import { userRouter } from 'apis/users/user-routes';
import { LikeRouter } from 'apis/likes/like-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/likes', LikeRouter);

export { router as appRouter };
