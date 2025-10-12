import rateLimit from 'express-rate-limit';
import { CustomError } from 'utils/error';

export class RateLimitMiddleware {
  static default = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip ?? 'unknown',
    handler: (_req, res) => {
      throw new CustomError(
        'TOO_MANY_REQUESTS',
        'Too many requests, please try again later.',
      );
    },
  });

  static auth = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip ?? 'unknown',
    handler: (_req, res) => {
      throw new CustomError(
        'TOO_MANY_REQUESTS',
        'Too many requests, please try again later.',
      );
    },
  });
}
