import { Router } from 'express';
import { AuthController } from './auth-controller';
import { asyncHandler } from 'utils/async-handler';
import { RateLimitMiddleware } from 'middlewares/rate-limiter-middleware';

const router = Router();

router.post(
  '/login',
  RateLimitMiddleware.auth,
  asyncHandler(AuthController.login),
);
router.post(
  '/refresh',
  RateLimitMiddleware.auth,
  asyncHandler(AuthController.refreshToken),
);
router.post('/logout', asyncHandler(AuthController.logout));

export { router as authRouter };
