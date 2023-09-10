import { Router } from "express";
import { postsRouter } from "./posts/posts-routes";
import { userRouter } from "users/user-routes";

const router = Router();

router.use("/posts", postsRouter);
router.use("/users", userRouter);

export { router as appRouter };
