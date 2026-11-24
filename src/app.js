import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from "morgan"
import indexRouter from "./routes/index.routes.js"


const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api",indexRouter);

export default app;