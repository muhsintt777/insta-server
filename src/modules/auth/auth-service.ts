import { HTTP_STATUS_CODES } from 'configs/constants';
import { User } from 'modules/users/user';
import { UserModel } from 'modules/users/user-model';
import { ApiError } from 'utils/api-error';
import { Crypto } from 'utils/crypto';
import { Token } from 'utils/token';

interface EmailLogin {
  type: 'EMAIL';
  email: string;
  password: string;
}

interface UsernameLogin {
  type: 'USERNAME';
  username: string;
  password: string;
}

type LoginParams = EmailLogin | UsernameLogin;

export class AuthService {
  static async login(loginDetails: LoginParams) {
    const { type } = loginDetails;
    let user: User | null = null;

    switch (type) {
      case 'EMAIL':
        user = await UserModel.findOne({
          email: loginDetails.email,
        });
        break;

      case 'USERNAME':
        user = await UserModel.findOne({
          username: loginDetails.username,
        });
        break;
    }

    if (!user) {
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        'User not found',
        'RESOURCE_NOT_FOUND',
      );
    }

    const isPasswordValid = Crypto.compare(
      user.password,
      loginDetails.password,
    );

    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'Invalid credentials',
        'AUTH_INVALID_CREDENTIALS',
      );
    }

    const accessToken = Token.createAccessToken(user.id);
    const refreshToken = Token.createRefreshToken(user.id);
    await UserModel.findByIdAndUpdate(user.id, { refreshToken: refreshToken });

    return { accessToken, refreshToken };
  }

  static async refreshToken(
    userID: string,
    refreshToken: string,
  ): Promise<string> {
    console.log(userID);

    const user = await UserModel.findById<User>(userID);
    if (!user)
      throw new ApiError(
        HTTP_STATUS_CODES.NOT_FOUND,
        'User not found',
        'RESOURCE_NOT_FOUND',
      );
    if (user.refreshToken !== refreshToken)
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'Invalid refresh token',
        'AUTH_UNAUTHORIZED',
      );

    return Token.createAccessToken(user.id);
  }

  static async logout(userID: string) {
    await UserModel.findByIdAndUpdate(userID, { refreshToken: null });
  }
}
