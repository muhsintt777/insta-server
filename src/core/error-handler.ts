import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { getZodErrMessage } from 'utils/common';
import { CustomError } from 'utils/error';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json(new ApiResponse(null, err.message, err.errorType));
  } else if (err instanceof ZodError) {
    const message = getZodErrMessage(err);
    res.status(422).json(new ApiResponse(null, message, 'VALIDATION_ERROR'));
  } else {
    console.log('unknow err: ', err);
    res
      .status(500)
      .json(new ApiResponse(null, 'Something went wrong', 'UNKNOWN_ERROR'));
  }
};
