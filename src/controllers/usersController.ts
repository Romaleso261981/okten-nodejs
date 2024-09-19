import { NextFunction, Request, Response } from "express";

import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getSingleUser,
  updateUserHandler,
} from "../services/user.service";

class UserController {
  public async getAllUsers(_: Request, res: Response, next: NextFunction) {
    try {
      // const users = await userRepository.getList();
      const users = await getAllUsers();

      return res.status(201).json({
        status: "successful",
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getSingleUser(req.params.userId);

      return res.status(201).json({
        result,
        status: "successful",
      });
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const { userId } = req.params;

      const updatedUsers = await updateUserHandler(userId, dto);

      return res.status(201).json({
        updatedUsers,
        status: "successful",
      });
    } catch (e) {
      next(e);
    }
  }

  public async removeUsersById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const newUsers = await deleteUserById(req.params.userId);

      return res.status(200).json({
        status: "successful",
        users: newUsers,
      });
    } catch (e) {
      next(e);
    }
  }

  public async addedUser(req: Request, res: Response, next: NextFunction) {
    const dto = req.body;

    try {
      const newUser = await createNewUser(dto);

      return res.status(201).json({
        newUser,
        status: "successful",
      });
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
