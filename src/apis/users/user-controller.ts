import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { uploadToCloud } from 'utils/cloud-storage';
import { UserService } from './user-service';
import { CreateUserReqSchema, UserIdSchema } from './user-validation';

export class UserController {
  static async getCurrentUser(req: Request, res: Response) {
    const userID = req.token?.userId!;
    const result = await UserService.getUser(userID);
    res.status(200).json(new ApiResponse(result));
  }

  static async getUser(req: Request, res: Response) {
    const userID = UserIdSchema.parse(req.params.id);
    const result = await UserService.getUser(userID);
    res.status(200).json(new ApiResponse(result));
  }

  static async createUser(req: Request, res: Response) {
    const { email, username, password, fullName } = CreateUserReqSchema.parse(
      req.body,
    );

    // handle file upload o cloud
    const profileImageLocalPath =
      (req.files as { [fieldname: string]: Express.Multer.File[] })?.[
        'profileImage'
      ]?.[0]?.path || null;
    let profileImageUrl: string | null = null;
    if (profileImageLocalPath) {
      profileImageUrl = (
        await uploadToCloud(profileImageLocalPath, 'profile-images')
      ).url;
    }

    const userID = await UserService.createUser(
      email,
      username,
      password,
      fullName,
      profileImageUrl,
    );

    res.status(201).json(new ApiResponse({ id: userID }, 'User created'));
  }

  static async deleteUser(req: Request, res: Response) {
    const id = UserIdSchema.parse(req.params.id);
    const userID = await UserService.deleteUser(id);
    res.status(200).json(new ApiResponse({ id: userID }, 'User deleted'));
  }
}
