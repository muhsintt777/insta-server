import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';
import { ERROR_TYPE } from 'utils/error';

export const notFoundHandler = (_req: Request, res: Response) => {
  res
    .status(404)
    .json(
      new ApiResponse(null, 'Route not found', ERROR_TYPE.RESOURCE_NOT_FOUND),
    );
};
