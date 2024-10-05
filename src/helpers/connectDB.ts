/* eslint-disable no-console */

import mongoose from "mongoose";

import config from "../configs";
import { ApiError } from "../errors/api-error";
import { server } from "./socket";

export async function connectMongoDB() {
  try {
    await mongoose.connect(config.BD_URI);
    server.listen(config.PORT, (): void => {
      console.log(`Your server is running on http://localhost:${config.PORT}`);
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
