import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { LikeController } from './like-controller';

const router = Router();

router.get(
  '/:postId',
  AuthMiddleware.verifyToken,
  asyncHandler(LikeController.getPostLikes),
);

router.post(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(LikeController.createLike),
);

router.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(LikeController.deleteLike),
);

export { router as LikeRouter };
