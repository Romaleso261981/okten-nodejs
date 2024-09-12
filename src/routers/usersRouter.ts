import express from "express";

import { userController } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", userController.addedUser);
usersRouter.delete("/:id", userController.removeUsersById);
usersRouter.put("/:id", userController.updateUser);

export { usersRouter };
