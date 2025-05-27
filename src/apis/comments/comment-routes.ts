import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { CommentController } from './comment-controller';

const router = Router();

router.get(
  '/post/:postId',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(CommentController.getPostComments),
);

router.post(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(CommentController.createComment),
);

router.put(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(CommentController.updateComment),
);

router.delete(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(CommentController.deleteComment),
);

export { router as commentRouter };
