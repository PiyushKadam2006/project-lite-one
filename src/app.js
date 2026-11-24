import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from "morgan"

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

export default app;