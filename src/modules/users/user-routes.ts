import { Router } from "express";
import { UserController } from "./user-controller";
import { errorHandler } from "utils/error-handler";

const router = Router();

router.post("/", errorHandler(UserController.createUser));
router.get("/:id", errorHandler(UserController.getUser));
router.delete("/:id", errorHandler(UserController.deleteUser));

export { router as userRouter };
