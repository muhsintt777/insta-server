import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { LikeController } from './like-controller';

const router = Router();

router.get(
  '/:postId',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(LikeController.getPostLikes),
);

router.post(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(LikeController.createLike),
);

router.delete(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(LikeController.deleteLike),
);

export { router as LikeRouter };
