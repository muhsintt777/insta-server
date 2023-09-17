import express from "express";
import { appRouter } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", appRouter);

export { app };
