import { Crypto } from "utils/crypto";
import { UserModal } from "./user-modal";
import { User } from "./user";

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
    firstName: string,
    lastName: string | null | undefined,
    email: string,
    password: string
  ): Promise<Omit<User, "password">> {
    try {
      const hashedPwd = await Crypto.hashString(password, 10);
      const userObj = await UserModal.create({
        firstName,
        lastName,
        email,
        password: hashedPwd,
      });
      const user = userObj.toJSON();
      delete user.password;
      delete user.email;
      const userWithoutPassword: Omit<User, "password"> = user;

      return userWithoutPassword;
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw {
          statusCode: 409,
          errorMessage: "User with same email already exist.",
        };
      } else {
        throw err;
      }
    }
  }
}
