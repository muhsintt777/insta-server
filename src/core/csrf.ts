import { RequestHandler } from 'express';
import csurf from 'csurf';

export const csrfProtection = csurf({
  cookie: {
    key: '_csrfSecret',
    httpOnly: false,
    secure: false,
    sameSite: 'none',
  },
}) as any as RequestHandler;
