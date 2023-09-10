import { Router } from "express";
import { PostsController } from "./posts-controller";

const router = Router();

router.post("/", PostsController.addPost);
router.get("/", PostsController.getAllPost);
router.delete("/:id", PostsController.deletePost);

export { router as postsRouter };
