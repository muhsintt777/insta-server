import { Request } from 'express';
import { AccessTokenData } from 'utils/token';

declare global {
  namespace Express {
    interface Request {
      token?: AccessTokenData;
    }
  }
}
