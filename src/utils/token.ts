import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { ApiError } from './api-error';
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

interface AccessTokenData {
  userId: string;
}

interface RefreshTokenData {
  userId: string;
}

export class Token {
  static createAccessToken(payload: AccessTokenData) {
    return jwt.sign(payload, ACCESS_TOKEN_KEY, {
      expiresIn: '1h',
    });
  }

  static verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
      return decoded as AccessTokenData;
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'Token expired',
        'AUTH_TOKEN_EXPIRED',
      );
    }
  }

  static createRefreshToken(payload: RefreshTokenData) {
    return jwt.sign(payload, REFRESH_TOKEN_KEY, {
      expiresIn: '1d',
    });
  }

  static verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_KEY);
      return decoded as RefreshTokenData;
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'Token expired',
        'AUTH_TOKEN_EXPIRED',
      );
    }
  }
}
