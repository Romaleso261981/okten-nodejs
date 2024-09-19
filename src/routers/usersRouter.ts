import express from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/usersController";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidation } from "../middlewares/validations/user.validation";

const usersRouter = express.Router();

usersRouter.get("/", authController.isAuthCheck, userController.getAllUsers);
usersRouter.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authController.isAuthCheck,
  userController.getById,
);
usersRouter.post(
  "/",
  userValidation.isBodyValidAdedeUser(),
  authController.isAuthCheck,
  userController.addedUser,
);
usersRouter.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authController.isAuthCheck,
  userController.removeUsersById,
);
usersRouter.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authController.isAuthCheck,
  userValidation.isBodyValidEditUser(),
  userController.updateUser,
);

export { usersRouter };
