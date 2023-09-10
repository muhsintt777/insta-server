import { User } from "users/user";
import { UserModal } from "users/user-modal";
import { Crypto } from "utils/crypto";

export class AuthService {
  static async login(email: string, password: string) {
    const userArr = await UserModal.findAll({
      where: {
        email: email,
      },
    });
    if (!userArr) throw { statusCode: 404, errorMessage: "User not found" };
    const user: User = userArr[0].toJSON();

    const isAuthenticated = await Crypto.compare(password, user.password);

    if (!isAuthenticated) {
      throw { statusCode: 401, errorMessage: "email or password are invalid" };
    }
  }
}
