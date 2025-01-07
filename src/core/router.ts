import { Router } from 'express';
import { authRouter } from 'modules/auth/auth-routes';
import { userRouter } from 'modules/users/user-routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export { router as appRouter };
