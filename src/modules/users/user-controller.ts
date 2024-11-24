import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { ApiResponse } from 'utils/api-response';
import { uploadToCloud } from 'utils/cloud';
import { UserService } from './user-service';
import { CreateUserReqSchema, UserIdSchema } from './user-schema';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const userID = UserIdSchema.parse(req.params.id);
    const result = await UserService.getUser(userID);

    res
      .status(HTTP_STATUS_CODES.OK)
      .json(new ApiResponse(result, HTTP_STATUS_CODES.OK));
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
      profileImageUrl = (await uploadToCloud(profileImageLocalPath)).url;
    }

    const userID = await UserService.createUser(
      email,
      username,
      password,
      fullName,
      profileImageUrl,
    );

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json(
        new ApiResponse(
          { id: userID },
          HTTP_STATUS_CODES.CREATED,
          'User created',
        ),
      );
  }

  static async deleteUser(req: Request, res: Response) {
    const id = UserIdSchema.parse(req.params.id);
    const userID = await UserService.deleteUser(id);

    res
      .status(HTTP_STATUS_CODES.OK)
      .json(
        new ApiResponse({ id: userID }, HTTP_STATUS_CODES.OK, 'User deleted'),
      );
  }
}
