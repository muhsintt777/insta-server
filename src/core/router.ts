import { Router } from 'express';
import { authRouter } from 'features/auth/auth-routes';
import { userRouter } from 'features/users/user-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export { router as appRouter };
