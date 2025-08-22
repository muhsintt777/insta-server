import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { CommentController } from './comment-controller';

const router = Router();

router.get(
  '/post/:postId',
  AuthMiddleware.verifyToken,
  asyncHandler(CommentController.getPostComments),
);

router.post(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(CommentController.createComment),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(CommentController.updateComment),
);

router.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(CommentController.deleteComment),
);

export { router as commentRouter };
