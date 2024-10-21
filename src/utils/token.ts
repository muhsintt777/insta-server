import jwt from "jsonwebtoken";
import { ApiError } from "./api-error";
import { HTTP_STATUS_CODES } from "configs/constants";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

export class Token {
  static createAccessToken(userID: string) {
    return jwt.sign({ id: userID }, ACCESS_TOKEN_KEY, {
      expiresIn: "1h",
    });
  }

  static createRefreshToken(userID: string) {
    return jwt.sign({ id: userID }, REFRESH_TOKEN_KEY, {
      expiresIn: "1d",
    });
  }

  static verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Token expired",
        "AUTH_TOKEN_EXPIRED"
      );
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Token expired",
        "AUTH_TOKEN_EXPIRED"
      );
    }
  }
}
