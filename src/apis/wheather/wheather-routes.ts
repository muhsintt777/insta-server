import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { WheatherController } from './wheather-controller';

const router = Router();

router.get(
  '/current',
  AuthMiddleware.verifyToken,
  asyncHandler(WheatherController.getCurrentWeather),
);

export { router as wheatherRouter };
