import { Router } from "express";
import { PostsController } from "./posts-controller";
import { AuthMiddleware } from "middlewares/auth-middleware";

const router = Router();

router.post("/", AuthMiddleware.verifyToken, PostsController.addPost);
router.put("/", AuthMiddleware.verifyToken, PostsController.updatePost);
router.get("/", AuthMiddleware.verifyToken, PostsController.getAllPost);
router.delete("/:id", PostsController.deletePost);

export { router as postsRouter };
