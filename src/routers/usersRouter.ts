import express from "express";

import { userController } from "../controllers/usersController";
import { commonMiddleware } from "../middlewares/common.middleware";

const usersRouter = express.Router();

usersRouter.get("/", userController.getAllUsers);
usersRouter.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
usersRouter.post(
  "/",
  commonMiddleware.isBodyValidAdedeUser(),
  userController.addedUser,
);
usersRouter.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.removeUsersById,
);
usersRouter.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValidEditUser(),
  userController.updateUser,
);

export { usersRouter };
