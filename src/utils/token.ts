import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { ENV } from 'configs/env';
import { ApiError } from './api-error';

interface AccessTokenData {
  userId: string;
}

interface RefreshTokenData {
  userId: string;
}

export class Token {
  static createAccessToken(payload: AccessTokenData) {
    return jwt.sign(payload, ENV.ACCESS_TOKEN_KEY, {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
    });
  }

  static verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_KEY);
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
    return jwt.sign(payload, ENV.REFRESH_TOKEN_KEY, {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRY,
    });
  }

  static verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_KEY);
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
