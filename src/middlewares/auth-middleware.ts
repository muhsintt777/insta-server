import { NextFunction, Request, Response } from 'express';
import { CustomError } from 'utils/error';
import { Token } from 'utils/token';

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
