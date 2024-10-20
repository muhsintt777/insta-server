import { NextFunction, Request, Response } from "express";
import { ApiError } from "./api-error";
import { HTTP_STATUS_CODES } from "configs/constants";
import { Error as MongoError, MongooseError } from "mongoose";
import { ZodError } from "zod";
import { getZodErrMessage } from "./common";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const errorHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      // next(err);

      //handle custom error
      if (err instanceof ApiError) {
        res
          .status(err.statusCode)
          .json(new ApiError(err.statusCode, err.errorMessage, err.errorType));
      } else if (err instanceof ZodError) {
        // handle zod error
        const message = getZodErrMessage(err);
        res
          .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
          .json(
            new ApiError(
              HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
              message,
              "VALIDATION_FAILED"
            )
          );
      } else if (err instanceof MongooseError) {
        // handle mongoose error
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(
            new ApiError(
              HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
              `${err.name}: ${err.message}`,
              "DB_ERROR"
            )
          );
      } else if (err instanceof MongoError) {
        // handle mongo error
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(
            new ApiError(
              HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
              `${err.name}: ${err.message}`,
              "DB_ERROR"
            )
          );
      } else if (err instanceof Error) {
        // handle node error
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(
            new ApiError(
              HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
              `${err.name}: ${err.message}`,
              "NODE_ERROR"
            )
          );
      } else {
        // handle unknown error
        console.log("unknow err: ", err);
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(
            new ApiError(
              HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
              "Something went wrong, please try again later.",
              "INTERNAL_SERVER_ERROR"
            )
          );
      }
    }
  };
};
