import { Router } from "express";
import { PostsController } from "./posts-controller";

const router = Router();

router.post("/", PostsController.addPost);
router.get("/", PostsController.getAllPost);

export { router as postsRouter };
