import { Crypto } from "utils/crypto";
import { UserModal } from "./user-modal";
import { User } from "./user";

export class UserService {
  static async getUser() {}

  static async createUser(
    firstName: string,
    lastName: string | null | undefined,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const hashedPwd = await Crypto.hashString(password, 10);
      const user = await UserModal.create({
        firstName,
        lastName,
        email,
        password: hashedPwd,
      });

      return user.toJSON() as User;
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
