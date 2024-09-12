/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { usersRouter } from "./routers/usersRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
