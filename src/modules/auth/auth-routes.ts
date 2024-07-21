import { Router } from "express";
// import { AuthController } from "./auth-controller";
// import { AuthMiddleware } from "middlewares/auth-middleware";

const router = Router();

// router.post("/login", AuthController.login);
// router.get("/user", AuthMiddleware.verifyToken, AuthController.getUser);

export { router as authRouter };
