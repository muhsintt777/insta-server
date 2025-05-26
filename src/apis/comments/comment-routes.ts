import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { CommentController } from './comment-controller';

const router = Router();

router.post(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(CommentController.createComment),
);

export { router as commentRouter };
