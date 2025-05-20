import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { PostsController } from './posts-controller';

const router = Router();

router.post(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.addPost),
);
router.put(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.updatePostCaption),
);
router.get(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.getAllPost),
);
router.get(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.getPost),
);
router.delete(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.deletePost),
);
router.get(
  '/currentUser',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(PostsController.getCurrentUserPosts),
);

export { router as postsRouter };
