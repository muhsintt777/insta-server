import { ApiError } from 'utils/api-error';
import { UserWithoutSensitive } from './user';
import { UserModel } from './user-model';
import { HTTP_STATUS_CODES } from 'configs/constants';

export class UserService {
  static async getUser(id: string): Promise<UserWithoutSensitive> {
    const result = await UserModel.findById(id, {
      password: 0,
      refreshToken: 0,
    });
    if (!result)
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        'User not found',
        'RESOURCE_NOT_FOUND',
      );
    return result;
  }

  static async createUser(
    email: string,
    username: string,
    password: string,
    fullName: string,
    profileImage: string | null,
  ): Promise<string> {
    const [isEmailExists, isUsernameExists] = await Promise.all([
      UserModel.exists({ email }),
      UserModel.exists({ username }),
    ]);
    if (isEmailExists || isUsernameExists) {
      const errorMessage =
        isEmailExists && isUsernameExists
          ? 'Email and username already exists'
          : isEmailExists
            ? 'Email already exists'
            : 'Username already exists';
      throw new ApiError(
        HTTP_STATUS_CODES.CONFLICT,
        errorMessage,
        'RESOURCE_ALREADY_EXISTS',
      );
    }

    const result = await UserModel.create({
      email,
      username,
      password,
      fullName,
      profileImage,
    });
    return result._id.toString();
  }

  static async deleteUser(id: string): Promise<string> {
    const result = await UserModel.findByIdAndDelete(id);
    if (!result)
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        'User not found',
        'RESOURCE_NOT_FOUND',
      );

    return result._id.toString();
  }
}
