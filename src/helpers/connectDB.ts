/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";

// import config from "../config";
import { ApiError } from "../errors/api-error";
import { app } from "../server";

let server: Server;

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    server = app.listen(process.env.PORT, (): void => {
      console.log(
        `Your server is running on http://localhost:${process.env.PORT}`,
      );
    });
  } catch (error) {
    throw new ApiError("Database Connection Error", error);
  }

  process.on("unhandledRejection", (error) => {
    console.log(error);
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
