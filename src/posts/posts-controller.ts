import { Request, Response } from "express";
import { FILE_TYPE } from "configs/constants";
import { storageBucket } from "configs/storage-bucket";
import { PostsService } from "./posts-service";
import crypto from "crypto";
import { PostsColumn } from "./posts";

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
        const fileName = crypto.randomBytes(16).toString("hex");

        const signedUrl = storageBucket.getSignedUrl("putObject", {
          Bucket: bucketName,
          Key: `posts-${fileName}`,
          // ACL: "public-read",
          ContentType: fileType,
        });

        const imageUrl = signedUrl.split("?")[0];

        //1 === processing
        const id = await PostsService.addPost(caption, imageUrl, 1);
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

  static async updatePost(req: Request, res: Response) {
    try {
      const id = req.body.id as number | undefined;
      if (!id) throw { statusCode: 400, errorMessage: "idd reqired" };

      const status = req.body.status as number | undefined;
      const caption = req.body.caption as string | undefined;
      if (!status && !caption) {
        throw { statusCode: 400, errorMessage: "bass reqest" };
      }

      const columns: PostsColumn = [];
      if (status) columns.push({ name: "status", value: 2 });
      if (caption) columns.push({ name: "caption", value: caption });

      await PostsService.updatePost(id, columns);
      res.status(200).json({ message: "updateddd" });
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
