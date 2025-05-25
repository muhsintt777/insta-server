import { Router } from 'express';
import { authRouter } from 'apis/auth/auth-routes';
import { postsRouter } from 'apis/posts/posts-routes';
import { userRouter } from 'apis/users/user-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export { router as appRouter };
