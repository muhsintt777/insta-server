import jwt from "jsonwebtoken";
const accessTokenKey = process.env.ACCESS_TOKEN_KEY as string;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY as string;

export class Token {
  static createAccessToken(payload: string) {
    return jwt.sign(payload, accessTokenKey, { expiresIn: "30s" });
  }

  static createRefreshToken(payload: string) {
    return jwt.sign(payload, refreshTokenKey, { expiresIn: "1d" });
  }
}
