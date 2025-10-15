import { CorsOptions } from 'cors';
import { ENV } from './env';

export const corsOptions: CorsOptions = {
  origin: ENV.CORS_ALLOWED_ORIGINS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
