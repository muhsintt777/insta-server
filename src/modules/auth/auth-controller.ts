import { Request, Response } from 'express';
import { ENV } from 'configs/env';
import { ApiResponse } from 'utils/api-response';
import { Token } from 'utils/token';
import { LoginReqSchema } from './auth-schema';
import { AuthService } from './auth-service';
import { CustomError } from 'utils/error';

const COOKIE_EXPIRY = Number(ENV.COOKIE_EXPIRY_IN_DAYS) * 24 * 60 * 60 * 1000; //in days

export class AuthController {
  static async login(req: Request, res: Response) {
    const loginDetails = LoginReqSchema.parse(req.body);

    let tokens: {
      accessToken: string;
      refreshToken: string;
    } | null = null;

    if (loginDetails.email) {
      tokens = await AuthService.login({
        type: 'EMAIL',
        email: loginDetails.email,
        password: loginDetails.password,
      });
    } else if (loginDetails.username) {
      tokens = await AuthService.login({
        type: 'USERNAME',
        username: loginDetails.username,
        password: loginDetails.password,
      });
    } else {
      throw new CustomError('BAD_REQUEST', 'Email or username is required');
    }

    res
      .status(200)
      .cookie('refreshToken', tokens.refreshToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: COOKIE_EXPIRY,
      })
      .cookie('accessToken', tokens.accessToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: COOKIE_EXPIRY,
      })
      .json(new ApiResponse(tokens, 'Login success'));
    return;
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken)
      throw new CustomError('AUTH_UNAUTHORIZED', 'Token required');

    const decodedToken = Token.verifyRefreshToken(refreshToken);
    const newToken = await AuthService.refreshToken(
      decodedToken.userId,
      refreshToken,
    );

    res
      .status(200)
      .cookie('accessToken', newToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: COOKIE_EXPIRY,
      })
      .json(new ApiResponse({ accessToken: newToken }, 'Refresh success'));
  }

  static async logout(req: Request, res: Response) {
    const userID = req.body.token?.userId;
    await AuthService.logout(userID);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json(new ApiResponse({ id: userID }, 'Logout success'));
  }
}
