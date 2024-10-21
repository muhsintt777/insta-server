import { Router } from "express";
import { UserController } from "./user-controller";
import { errorHandler } from "utils/error-handler";
import { AuthMiddleware } from "middlewares/auth-middleware";

const router = Router();

router.post("/", errorHandler(UserController.createUser));

router.get(
  "/:id",
  errorHandler(AuthMiddleware.verifyToken),
  errorHandler(UserController.getUser)
);

router.delete(
  "/:id",
  errorHandler(AuthMiddleware.verifyToken),
  errorHandler(UserController.deleteUser)
);

export { router as userRouter };
