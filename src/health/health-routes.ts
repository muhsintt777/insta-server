import { Router } from 'express';
import { ApiResponse } from 'utils/api-response';

const router = Router();

router.all('/', (_req, res) => {
  res.status(200).json(new ApiResponse(null, 'Health check success'));
});

export { router as healthRouter };
