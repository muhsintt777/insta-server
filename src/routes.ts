import { Router } from "express";
import { postsRouter } from "./posts/posts-routes";
import { userRouter } from "users/user-routes";
import { authRouter } from "auth/auth-routes";

const router = Router();

router.use("/posts", postsRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export { router as appRouter };
