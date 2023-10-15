import { Request, Response } from "express";
import { FILE_TYPE } from "configs/constants";
import { storageBucket } from "configs/storage-bucket";
import { PostsService } from "./posts-service";

const bucketName = process.env.STORAGE_BUCKET_NAME;

// const POST_STATUS = {
//   PROCESSING: 1,
//   UPLOADED: 2,
// };

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
      // let imageUrl = req.body.imageUrl as string | null;
      // if (!imageUrl) imageUrl = null;

      if (!caption) {
        res.status(400).json({ message: "caption required" });
        return;
      }

      //--- posts with image ---
      const fileType = req.query.fileType;
      if (
        fileType === FILE_TYPE.imagePNG ||
        fileType === FILE_TYPE.imageJPEG ||
        fileType === FILE_TYPE.imageJPG
      ) {
        const id = await PostsService.addPost(caption, null, 1);
        const signedUrl = storageBucket.getSignedUrl("putObject", {
          Bucket: bucketName,
          Key: `posts-${id}`,
          // ACL: "public-read",
          ContentType: fileType,
        });

        res.status(201).json({ id, signedUrl });
        return;
      }
      //--- posts with image---

      const id = await PostsService.addPost(caption, null, 2);
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

  static async deletePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id) as number;
      if (!id) throw { statusCode: 400, errorMessage: "id required" };

      const deletedId = await PostsService.deletePost(id);
      res
        .status(204)
        .json({ message: "Post deleted successfully", id: deletedId });
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
