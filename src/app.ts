import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "configs/cors";
import { appRouter } from "./routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", appRouter);

export { app };
