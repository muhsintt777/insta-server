import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { fileUpload } from 'middlewares/file-upload-middleware';
import { asyncHandler } from 'utils/async-handler';
import { PostsController } from './posts-controller';

const router = Router();

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(PostsController.getAllPost),
);
router.get(
  '/currentuser',
  AuthMiddleware.verifyToken,
  asyncHandler(PostsController.getCurrentUserPosts),
);
router.get(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(PostsController.getPost),
);

router.post(
  '/',
  AuthMiddleware.verifyToken,
  fileUpload.fields([{ name: 'image', maxCount: 1 }]),
  asyncHandler(PostsController.addPost),
);

router.put(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(PostsController.updatePostCaption),
);

router.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(PostsController.deletePost),
);

export { router as postsRouter };
