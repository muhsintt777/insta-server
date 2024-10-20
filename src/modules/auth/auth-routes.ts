import { Router } from "express";
import { AuthController } from "./auth-controller";
import { errorHandler } from "utils/error-handler";

const router = Router();

router.post("/login", errorHandler(AuthController.login));

export { router as authRouter };
