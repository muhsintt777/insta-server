import { IUserWithoutSensitive } from "./user";
import { UserModel } from "./user-model";

export class UserService {
  static async getUser(id: string): Promise<IUserWithoutSensitive> {
    try {
      const result = await UserModel.findById(id, {
        password: 0,
        refreshToken: 0,
      });

      if (!result) throw new Error("no user");

      return result;
    } catch (err) {
      console.log("getUsererr", err);
      throw err;
    }
  }

  static async createUser(
    email: string,
    username: string,
    password: string,
    fullName: string,
    profileImage: string | null
  ): Promise<string> {
    try {
      const result = await UserModel.create({
        email,
        username,
        password,
        fullName,
        profileImage,
      });

      return result._id.toString();
    } catch (err) {
      console.log("createuser", err);
      throw err;
    }
  }

  static async deleteUser(id: string): Promise<string> {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      if (!result) throw new Error("no user found");
      return result.id;
    } catch (error) {
      console.log("deleteUser error", error);
      throw error;
    }
  }
}
