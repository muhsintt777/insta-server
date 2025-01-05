import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from 'configs/cors';
import { appRouter } from './routes';
import { notFoundHandler } from './not-found-handler';
import { healthHandler } from './health-handler';
import { errorHandler } from './error-handler';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);
app.use('/health', healthHandler);
app.use('/*', notFoundHandler);
app.use(errorHandler);

export { app };
