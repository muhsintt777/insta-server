import { Router } from 'express';
import { AuthController } from './auth-controller';
import { asyncHandler } from 'utils/async-handler';
import { RateLimitMiddleware } from 'middlewares/rate-limiter-middleware';

const router = Router();

router.use(RateLimitMiddleware.auth);

router.post('/login', asyncHandler(AuthController.login));
router.post('/refresh', asyncHandler(AuthController.refreshToken));
router.post('/logout', asyncHandler(AuthController.logout));

export { router as authRouter };
