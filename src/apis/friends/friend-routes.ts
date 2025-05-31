import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { FriendController } from './friend-controller';

const router = Router();

router.get(
  '/',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.getFriends),
);

router.get(
  '/:userId',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.getFriendShipDetails),
);

router.post(
  '/request/:userId',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.createFriend),
);

router.put(
  '/accept/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.acceptFriendRequest),
);

router.put(
  '/reject/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.rejectFriendRequest),
);

router.delete(
  '/:id',
  asyncHandler(AuthMiddleware.verifyToken),
  asyncHandler(FriendController.deleteFriend),
);

export { router as friendRouter };
