import { CorsOptions } from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'https://insta-web-dev.netlify.app',
];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
