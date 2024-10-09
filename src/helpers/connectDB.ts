/* eslint-disable no-console */

import mongoose from "mongoose";

import configs from "../configs";
import { ApiError } from "../errors/api-error";
import { server } from "../server";

export async function connectMongoDB() {
  try {
    await mongoose.connect(configs.BD_URI);
    console.log("MongoDB connected successfully.");
    server.listen(configs.PORT, (): void => {
      console.log(`Your server is running on http://localhost:${configs.PORT}`);
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
