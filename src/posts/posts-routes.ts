import { Router } from "express";
import { PostsController } from "./posts-controller";
import { AuthMiddleware } from "middlewares/auth-middleware";

const router = Router();

router.post("/", PostsController.addPost);
router.get("/", AuthMiddleware.verifyToken, PostsController.getAllPost);
router.delete("/:id", PostsController.deletePost);

export { router as postsRouter };
