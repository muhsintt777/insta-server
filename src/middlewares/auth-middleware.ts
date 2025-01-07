import { NextFunction, Request, Response } from 'express';
import { CustomError } from 'utils/error';
import { AccessTokenData, Token } from 'utils/token';

declare global {
  namespace Express {
    interface Request {
      token?: AccessTokenData;
    }
  }
}

export class AuthMiddleware {
  static async verifyToken(req: Request, _res: Response, next: NextFunction) {
    let token = req.cookies.accessToken;
    if (!token) token = req.headers.authorization;
    if (!token) token = req.body.token;
    if (!token) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Token required');
    }

    const decoded = Token.verifyAccessToken(token);
    req.token = decoded;
    next();
  }
}
