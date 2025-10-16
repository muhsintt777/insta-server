import rateLimit, { Options } from 'express-rate-limit';
import { CustomError } from 'utils/error';

export class RateLimitMiddleware {
  private static config: Partial<Options> = {
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip ?? 'unknown',
    handler: () => {
      throw new CustomError(
        'TOO_MANY_REQUESTS',
        'Too many requests, please try again later.',
      );
    },
  };

  static default = rateLimit({
    ...this.config,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
  });

  static auth = rateLimit({
    ...this.config,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
  });
}
