import { Router } from "express";
import { PostsController } from "./posts-controller";

const router = Router();

router.post("/", PostsController.addPost);

export { router as postsRouter };
