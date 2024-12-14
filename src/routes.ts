import { Router } from 'express';
import { healthRouter } from 'health-check/health-routes';
import { authRouter } from 'modules/auth/auth-routes';
// import { postsRouter } from "modules/posts/posts-routes";
import { userRouter } from 'modules/users/user-routes';

const router = Router();

// router.use("/posts", postsRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/health', healthRouter);

export { router as appRouter };
