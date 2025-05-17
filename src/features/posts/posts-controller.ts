import { Request, Response } from 'express';
import { FILE_TYPE } from 'configs/constants';
import { PostsService } from './posts-service';
import crypto from 'crypto';

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
        res.status(400).json({ message: 'Something went wrong' });
      }
    }
  }

  static async addPost(req: Request, res: Response) {
    try {
      const caption = req.body.caption as string;

      if (!caption) {
        res.status(400).json({ message: 'caption required' });
        return;
      }

      const fileType = req.query.fileType;
      if (
        fileType === FILE_TYPE.imagePNG ||
        fileType === FILE_TYPE.imageJPEG ||
        fileType === FILE_TYPE.imageJPG
      ) {
        const fileName = crypto.randomBytes(16).toString('hex');

        res.status(201).json({});
        return;
      }
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: 'Something went wrong' });
      }
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const id = req.body.id as number | undefined;
      if (!id) throw { statusCode: 400, errorMessage: 'idd reqired' };

      const status = req.body.status as number | undefined;
      const caption = req.body.caption as string | undefined;
      if (!status && !caption) {
        throw { statusCode: 400, errorMessage: 'bass reqest' };
      }

      res.status(200).json({ message: 'updateddd' });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: 'Something went wrong' });
      }
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const id = Number(req.params.id) as number;
      if (!id) throw { statusCode: 400, errorMessage: 'id required' };

      const deletedId = await PostsService.deletePost(id);
      res
        .status(204)
        .json({ message: 'Post deleted successfully', id: deletedId });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: 'Something went wrong' });
      }
    }
  }
}
