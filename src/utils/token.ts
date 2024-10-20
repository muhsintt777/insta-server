import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;

interface PayloadType {
  id: number;
}

export class Token {
  static createAccessToken(payload: PayloadType) {
    return jwt.sign(payload, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  }

  static createRefreshToken(payload: PayloadType) {
    return jwt.sign(payload, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_KEY);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_TOKEN_KEY);
  }
}
