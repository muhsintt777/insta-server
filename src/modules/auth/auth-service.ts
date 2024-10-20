import { HTTP_STATUS_CODES } from "configs/constants";
import { TUser } from "modules/users/user";
import { UserModel } from "modules/users/user-model";
import { ApiError } from "utils/api-error";
import { Crypto } from "utils/crypto";
import { Token } from "utils/token";

interface EmailLogin {
  type: "EMAIL";
  email: string;
  password: string;
}

interface UsernameLogin {
  type: "USERNAME";
  username: string;
  password: string;
}

type LoginParams = EmailLogin | UsernameLogin;

export class AuthService {
  static async login(loginDetails: LoginParams) {
    const { type } = loginDetails;
    let user: TUser | null = null;

    switch (type) {
      case "EMAIL":
        user = await UserModel.findOne({
          email: loginDetails.email,
        });
        break;

      case "USERNAME":
        user = await UserModel.findOne({
          username: loginDetails.username,
        });
        break;
    }

    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        "User not found",
        "RESOURCE_NOT_FOUND"
      );
    }

    const isPasswordValid = Crypto.compare(
      user.password,
      loginDetails.password
    );

    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Invalid credentials",
        "AUTH_INVALID_CREDENTIALS"
      );
    }

    console.log("hit1");

    const accessToken = Token.createAccessToken(user.id);
    const refreshToken = Token.createRefreshToken(user.id);
    console.log("hit2");

    await UserModel.findByIdAndUpdate(user.id, { refreshToken: refreshToken });
    return { accessToken, refreshToken };
  }
}
