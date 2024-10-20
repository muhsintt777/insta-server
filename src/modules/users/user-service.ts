import { ApiError } from "utils/api-error";
import { IUserWithoutSensitive } from "./user";
import { UserModel } from "./user-model";
import { HTTP_STATUS_CODES } from "configs/constants";

export class UserService {
  static async getUser(id: string): Promise<IUserWithoutSensitive> {
    const result = await UserModel.findById(id, {
      password: 0,
      refreshToken: 0,
    });
    if (!result)
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        "User not found",
        "RESOURCE_NOT_FOUND"
      );
    return result;
  }

  static async createUser(
    email: string,
    username: string,
    password: string,
    fullName: string,
    profileImage: string | null
  ): Promise<string> {
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
    return result.id;
  }
}
