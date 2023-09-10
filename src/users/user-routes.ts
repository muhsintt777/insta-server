import { Router } from "express";
import { UserController } from "./user-controller";

const router = Router();

router.post("/", UserController.createUser);

export { router as userRouter };
