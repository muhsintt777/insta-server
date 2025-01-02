import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from 'configs/cors';
import { ApiError } from 'utils/api-error';
import { appRouter } from './routes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);
app.use((req, res) =>
  res.status(404).json(new ApiError(404, 'Not Found', 'RESOURCE_NOT_FOUND')),
);

export { app };
