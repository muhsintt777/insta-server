import jwt from 'jsonwebtoken';
import { ENV } from 'configs/env';
import { CustomError } from './error';

export interface AccessTokenData {
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
      throw new CustomError('AUTH_TOKEN_EXPIRED', 'Token expired');
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
      throw new CustomError('SIGNED_OUT', 'Invalid token');
    }
  }
}
