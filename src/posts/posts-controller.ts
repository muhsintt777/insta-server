import { Request, Response } from "express";
import { PostsService } from "./posts-service";

export class PostsController {
  static async getAllPost(_req: Request, res: Response) {
    try {
      const result = await PostsService.getAllPost();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }

  static async addPost(req: Request, res: Response) {
    try {
      const caption = req.body.caption as string;
      let imageUrl = req.body.imageUrl as string | null;
      if (!imageUrl) imageUrl = null;

      if (!caption) {
        res.status(400).json({ message: "caption required" });
        return;
      }

      const id = await PostsService.addPost(caption, imageUrl);
      res.status(201).json({ id });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
}
