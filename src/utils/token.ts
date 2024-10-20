import jwt from "jsonwebtoken";
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
    return jwt.verify(token, ACCESS_TOKEN_KEY);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_TOKEN_KEY);
  }
}
