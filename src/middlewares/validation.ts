import { Request, Response, NextFunction } from "express";
import { getZodErrMessage } from "utils/validation";

export function validateRequest<T>(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = schema.parse(schema) as T;
      req.body = body;
      //   req.validated = body as T;
      next();
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      res.json({ statusCode: 422, errorMessage });
    }
  };
}
