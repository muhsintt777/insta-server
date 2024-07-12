import { UserModal } from "modules/users/user-modal";
import { User } from "modules/users/user";
import { Crypto } from "utils/crypto";
import { Token } from "utils/token";

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const userArr = await UserModal.findAll({
      where: {
        email: email,
      },
    });
    if (!userArr.length)
      throw { statusCode: 404, errorMessage: "User not found" };
    const user: User = userArr[0]?.toJSON();

    // if (!user) throw { statusCode: 400, errorMessage: "User not found" };

    const isAuthenticated = await Crypto.compare(password, user.password);

    if (!isAuthenticated) {
      throw { statusCode: 401, errorMessage: "email or password are invalid" };
    }

    return Token.createAccessToken({ id: user.id, email: user.email });
  }

  static async getUser(id: number): Promise<Omit<User, "password">> {
    const userArr = await UserModal.findAll({
      where: {
        id: id,
      },
    });
    if (!userArr.length)
      throw { statusCode: 404, errorMessage: "User not found" };

    const user = userArr[0]?.toJSON();
    delete user.password;
    const mutatedUser: Omit<User, "password"> = user;
    return mutatedUser;
  }
}
