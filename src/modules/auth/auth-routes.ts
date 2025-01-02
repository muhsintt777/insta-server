import { Router } from 'express';
import { AuthController } from './auth-controller';
import { asyncHandler } from 'utils/async-handler';
import { AuthMiddleware } from 'middlewares/auth-middleware';

const router = Router();

router.post('/login', asyncHandler(AuthController.login));
router.post('/refresh', asyncHandler(AuthController.refreshToken));
router.post(
  '/logout',
  AuthMiddleware.verifyToken,
  asyncHandler(AuthController.logout),
);

export { router as authRouter };
