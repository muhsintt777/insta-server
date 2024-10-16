import jwt from "jsonwebtoken";
const accessTokenKey = process.env.ACCESS_TOKEN_KEY as string;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY as string;

interface PayloadType {
  id: number;
}

export class Token {
  static createAccessToken(payload: PayloadType) {
    return jwt.sign(payload, accessTokenKey, { expiresIn: "1d" });
  }

  static createRefreshToken(payload: PayloadType) {
    return jwt.sign(payload, refreshTokenKey, { expiresIn: "1d" });
  }
}
