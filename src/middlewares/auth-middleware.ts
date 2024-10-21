import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "configs/constants";
import { ApiError } from "utils/api-error";
import { Token } from "utils/token";

export class AuthMiddleware {
  static async verifyToken(req: Request, _res: Response, next: NextFunction) {
    let token = req.cookies.accessToken;
    if (!token) token = req.headers.authorization;
    if (!token) token = req.body.token;
    if (!token) {
      throw new ApiError(
        HTTP_STATUS_CODES.BAD_REQUEST,
        "Token is required",
        "AUTH_TOKEN_MISSING"
      );
    }

    const decoded = Token.verifyAccessToken(token);
    req.body.token = decoded;
    next();
  }
}
