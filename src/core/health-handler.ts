import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';

export const healthHandler = (_req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(null, 'Health check success'));
};
