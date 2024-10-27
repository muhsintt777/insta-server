import { Router } from "express";
import { AuthMiddleware } from "middlewares/auth-middleware";
import { fileUpload } from "middlewares/file-upload-middleware";
import { errorHandler } from "utils/error-handler";
import { UserController } from "./user-controller";

const router = Router();

router.post(
  "/",
  fileUpload.fields([{ name: "profileImage", maxCount: 1 }]),
  errorHandler(UserController.createUser)
);

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
