import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { PostsService } from './posts-service';
import { createPostSchema, updatePostCaptionSchema } from './post-validation';
import { uploadToCloud } from 'utils/cloud-storage';
import { validateId } from 'utils/common';
import { fileUploadValidation } from 'utils/file-upload-validation';

export class PostsController {
  static async getAllPost(_req: Request, res: Response) {
    const result = await PostsService.getAllPost();
    if (!result.length) res.status(204).json();
    res.status(200).json(new ApiResponse(result));
  }

  static async getPost(req: Request, res: Response) {
    const postId = validateId(req.params.id);
    const result = await PostsService.getPost(postId);
    res.status(200).json(new ApiResponse(result));
  }

  static async addPost(req: Request, res: Response) {
    const imagePath = fileUploadValidation(req, 'image');
    const { caption } = createPostSchema.parse({
      ...req.body,
    });

    // handle file upload to cloud
    const imageUrl = (await uploadToCloud(imagePath, 'posts')).url;
    const userId = req.token?.userId!;
    const result = await PostsService.addPost(caption, imageUrl, userId);
    res.status(201).json(new ApiResponse(result, 'Post created'));
  }

  static async updatePostCaption(req: Request, res: Response) {
    const postId = validateId(req.params.id);
    const { caption } = updatePostCaptionSchema.parse(req.body);
    const result = await PostsService.updatePostCaption(postId, caption);
    res.status(200).json(new ApiResponse({ id: result }, 'Post updated'));
  }

  static async deletePost(req: Request, res: Response) {
    const postId = validateId(req.params.id);
    const result = await PostsService.deletePost(postId);
    res.status(200).json(new ApiResponse({ id: result }, 'Post deleted'));
  }

  static async getCurrentUserPosts(req: Request, res: Response) {
    const userId = req.token?.userId!;
    const result = await PostsService.getCurrentUserPosts(userId);
    if (!result.length) res.status(204).json();
    res.status(200).json(new ApiResponse(result));
  }
}
