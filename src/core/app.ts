import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
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
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.get('/health', healthHandler);
app.get('/metadata', metaDataHandler);
app.use('/sync', syncRouter);
app.use('/api', appRouter);
app.use('/*', notFoundHandler);
app.use(errorHandler);

export { app };
