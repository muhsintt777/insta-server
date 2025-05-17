import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { PostsService } from './posts-service';
import { createPostSchema, updatePostCaptionSchema } from './post-validation';
import { uploadToCloud } from 'utils/cloud-storage';
import { validateId } from 'utils/common';

export class PostsController {
  static async getAllPost(_req: Request, res: Response) {
    const result = await PostsService.getAllPost();
    res.status(200).json(new ApiResponse(result));
  }

  static async addPost(req: Request, res: Response) {
    const imagePath =
      (req.files as { [fieldname: string]: Express.Multer.File[] })?.[
        'image'
      ]?.[0]?.path || null;
    const { caption, image } = createPostSchema.parse({
      ...req.body,
      image: imagePath,
    });

    // handle file upload to cloud
    const imageUrl = (await uploadToCloud(image, 'posts')).url;
    const userId = req.token?.userId!;
    const result = await PostsService.addPost(caption, imageUrl, userId);
    res.status(201).json(new ApiResponse(result, 'Post created'));
  }

  static async updatePostCaption(req: Request, res: Response) {
    const { caption, id } = updatePostCaptionSchema.parse(req.body);
    const result = await PostsService.updatePostCaption(id, caption);
    res.status(200).json(new ApiResponse({ id: result }, 'Post updated'));
  }

  static async deletePost(req: Request, res: Response) {
    const postId = validateId(req.params.id);
    const result = await PostsService.deletePost(postId);
    res.status(200).json(new ApiResponse({ id: result }, 'Post deleted'));
  }
}
