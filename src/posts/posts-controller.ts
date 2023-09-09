import { Request, Response } from "express";
import { PostsService } from "./posts-service";

export class PostsController {
  static async addPost(req: Request, res: Response) {
    try {
      const caption = req.body.caption as string;
      const imageUrl = req.body.caption as string | null;
      if (!caption) {
        res.status(400).json({ message: "caption required" });
        return;
      }

      const result = PostsService.addPost(caption, imageUrl);
      res.status(201).json({ id: result });
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
