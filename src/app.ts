import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ZodError } from 'zod';
import { corsOptions } from 'configs/cors';
import { CustomError, ERROR_TYPE } from 'utils/error';
import { ApiResponse } from 'utils/api-response';
import { getZodErrMessage } from 'utils/common';
import { appRouter } from './routes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);
app.use('/*', (_req, res) =>
  res
    .status(404)
    .json(
      new ApiResponse(null, 'Route not found', ERROR_TYPE.RESOURCE_NOT_FOUND),
    ),
);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
});

export { app };
