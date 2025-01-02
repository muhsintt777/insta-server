import { User } from 'modules/users/user';
import { UserModel } from 'modules/users/user-model';
import { Crypto } from 'utils/crypto';
import { CustomError } from 'utils/error';
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
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid credentials');
    }

    const isPasswordValid = Crypto.compare(
      user.password,
      loginDetails.password,
    );

    if (!isPasswordValid) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid credentials');
    }

    const accessToken = Token.createAccessToken({ userId: user.id });
    const refreshToken = Token.createRefreshToken({ userId: user.id });
    await UserModel.findByIdAndUpdate(user.id, { refreshToken: refreshToken });

    return { accessToken, refreshToken };
  }

  static async refreshToken(
    userID: string,
    refreshToken: string,
  ): Promise<string> {
    console.log(userID);

    const user = await UserModel.findById<User>(userID);
    if (user?.refreshToken !== refreshToken)
      throw new CustomError('AUTH_UNAUTHORIZED', 'Unauthorized');

    return Token.createAccessToken({ userId: user.id });
  }

  static async logout(userID: string) {
    await UserModel.findByIdAndUpdate(userID, { refreshToken: null });
  }
}
