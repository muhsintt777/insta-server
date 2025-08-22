import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/auth-middleware';
import { asyncHandler } from 'utils/async-handler';
import { FriendController } from './friend-controller';

const router = Router();

router.get(
  '/',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.getFriends),
);

router.get(
  '/request',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.getFriendRequests),
);

router.get(
  '/:userId',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.getFriendShipDetails),
);

router.post(
  '/request/:userId',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.createFriend),
);

router.put(
  '/accept/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.acceptFriendRequest),
);

router.put(
  '/reject/:id',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.rejectFriendRequest),
);

router.delete(
  '/:friendShipId',
  AuthMiddleware.verifyToken,
  asyncHandler(FriendController.deleteFriend),
);

export { router as friendRouter };
