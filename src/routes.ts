import { Router } from "express";
// import { authRouter } from "modules/auth/auth-routes";
import { postsRouter } from "modules/posts/posts-routes";
import { userRouter } from "modules/users/user-routes";

const router = Router();

router.use("/posts", postsRouter);
router.use("/users", userRouter);
// router.use("/auth", authRouter);

export { router as appRouter };
