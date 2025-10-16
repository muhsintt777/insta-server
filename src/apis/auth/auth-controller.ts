import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { Token } from 'utils/token';
import { CustomError } from 'utils/error';
import { LoginReqSchema } from './auth-validation';
import { AuthService } from './auth-service';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, username, password } = LoginReqSchema.parse(req.body);

    let tokens: { accessToken: string; refreshToken: string };
    if (email) {
      tokens = await AuthService.login({ type: 'EMAIL', email, password });
    } else if (username) {
      tokens = await AuthService.login({
        type: 'USERNAME',
        username,
        password,
      });
    }

    res.status(200).json(
      new ApiResponse(
        {
          accessToken: `Bearer ${tokens!.accessToken}`,
          refreshToken: `Bearer ${tokens!.refreshToken}`,
        },
        'Login success',
      ),
    );
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.headers.authorization?.split?.(' ')?.[1];
    if (!refreshToken)
      throw new CustomError('AUTH_UNAUTHORIZED', 'Token required');

    const decodedToken = Token.verifyRefreshToken(refreshToken);
    const newToken = await AuthService.refreshToken(
      decodedToken.userId,
      refreshToken,
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          { accessToken: `Bearer ${newToken}` },
          'Refresh success',
        ),
      );
  }

  static async logout(req: Request, res: Response) {
    const userID = req.token?.userId;
    await AuthService.logout(userID!);

    res.status(200).json(new ApiResponse({ id: userID }, 'Logout success'));
  }
}
