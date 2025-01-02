import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { fileUpload } from 'middlewares/file-upload-middleware';
import { asyncHandler } from 'utils/async-handler';
import { UserController } from './user-controller';

const router = Router();

router.post(
  '/',
  fileUpload.fields([{ name: 'profileImage', maxCount: 1 }]),
  asyncHandler(UserController.createUser),
);

router.get(
  '/me',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(UserController.getCurrentUser),
);

router.get(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(UserController.getUser),
);

router.delete(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(UserController.deleteUser),
);

export { router as userRouter };
