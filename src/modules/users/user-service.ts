import { UserModal } from "./user-modal";
import { User } from "./user";
import { UserModel } from "./user-model";

export class UserService {
  static async getUser(id: number): Promise<Omit<User, "password" | "email">> {
    const userArr = await UserModal.findAll({
      where: {
        id: id,
      },
    });
    if (!userArr.length)
      throw { statusCode: 404, errorMessage: "User not found" };

    const user = userArr[0]?.toJSON();
    delete user.password;
    delete user.email;
    const mutatedUser: Omit<User, "password" | "email"> = user;
    return mutatedUser;
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
}
