import { Router } from 'express';
import { authRouter } from 'features/auth/auth-routes';
import { postsRouter } from 'features/posts/posts-routes';
import { userRouter } from 'features/users/user-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export { router as appRouter };
