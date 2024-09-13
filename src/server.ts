/* eslint-disable no-console */
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { ApiError } from "./errors/api-error";
import { sendRes } from "./helpers/sendRes";
import { usersRouter } from "./routers/usersRouter";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing API
app.get("/", (_: Request, res: Response) => {
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "App Running Successfully",
    data: null,
  });
});

app.use("/users", usersRouter);

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

app.listen(8080, () => {
  console.log("Server is running on http://localhost:3000");
});
