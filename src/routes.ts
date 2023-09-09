import { Router } from "express";
import { postsRouter } from "./posts/posts-routes";

const router = Router();

router.use("/posts", postsRouter);

export { router as appRouter };
