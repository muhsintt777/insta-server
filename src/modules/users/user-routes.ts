import { Router } from "express";
import { UserController } from "./user-controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/:id", UserController.getUser);
router.delete("/:id", UserController.deleteUser);

export { router as userRouter };
