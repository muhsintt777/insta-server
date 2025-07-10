import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from 'configs/cors';
import { appRouter } from './router';
import { notFoundHandler } from './not-found-handler';
import { healthHandler } from './health-handler';
import { errorHandler } from './error-handler';
import { metaDataHandler } from './meta-data';

const app = express();

app.use(morgan(':method :url :status'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);
app.use('/metadata', metaDataHandler);
app.use('/health', healthHandler);
app.use('/*', notFoundHandler);
app.use(errorHandler);

export { app };
