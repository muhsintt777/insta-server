import { CorsOptions } from "cors";

const allowedOrigins = "http://localhost:5173";

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
