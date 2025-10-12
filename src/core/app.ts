import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from 'configs/cors';
import { RateLimitMiddleware } from 'middlewares/rate-limiter-middleware';
import { appRouter } from './router';
import { notFoundHandler } from './not-found-handler';
import { healthHandler } from './health-handler';
import { errorHandler } from './error-handler';
import { metaDataHandler } from './meta-data';
import { syncRouter } from './sync';

const app = express();

app.set('trust proxy', 1);
app.use(RateLimitMiddleware.default);
app.use(morgan(':method :url :status'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);
app.use('/sync', syncRouter);
app.use('/metadata', metaDataHandler);
app.use('/health', healthHandler);
app.use('/*', notFoundHandler);
app.use(errorHandler);

export { app };
