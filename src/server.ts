/* eslint-disable no-console */
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import httpStatus from "http-status";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { connectMongoDB } from "./helpers/connectDB";
import { sendRes } from "./helpers/sendRes";
import { authRouter } from "./routers/auth.router";
import { usersRouter } from "./routers/usersRouter";

const app = express();

export const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

connectMongoDB();

cronRunner();

app.use("*", (req: Request, _, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_: Request, res: Response) => {
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "App Running Successfully",
    data: null,
  });
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (error: ApiError, _: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});
