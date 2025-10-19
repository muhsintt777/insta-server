import { RequestHandler, Request, Response, NextFunction } from 'express';
import csurf from 'csurf';
import { ApiResponse } from 'utils/api-response';

export const csrfProtection = csurf({
  cookie: {
    key: '_csrfSecret',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
}) as any as RequestHandler;

export const csrfTokenRoute = (req: Request, res: Response) => {
  const token = (req as any).csrfToken() as string;

  return res.status(200).json(new ApiResponse({ csrfToken: token }));
};
