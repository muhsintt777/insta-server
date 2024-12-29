import { Router } from 'express';
import { AuthController } from './auth-controller';
import { errorHandler } from 'utils/error-handler';
import { AuthMiddleware } from 'middlewares/auth-middleware';

const router = Router();

router.post('/login', errorHandler(AuthController.login));
router.post('/refresh', errorHandler(AuthController.refreshToken));
router.post(
  '/logout',
  AuthMiddleware.verifyToken,
  errorHandler(AuthController.logout),
);

export { router as authRouter };
