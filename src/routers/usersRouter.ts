import express from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/usersController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { userValidation } from "../middlewares/validations/user.validation";

const usersRouter = express.Router();

usersRouter.get("/", authController.isAuthCheck, userController.getAllUsers);
usersRouter.get(
  "/me",
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
  "/me",
  commonMiddleware.isIdValid("userId"),
  authController.isAuthCheck,
  userController.removeUsersById,
);

usersRouter.put(
  "/me",
  commonMiddleware.isIdValid("userId"),
  authController.isAuthCheck,
  userValidation.isBodyValidEditUser(),
  userController.updateUser,
);

usersRouter.put(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid(),
  // authController.isAuthCheck,
  userController.uploadAvatar,
);

export { usersRouter };
