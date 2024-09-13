import { NextFunction, Request, Response } from "express";

import { userRepository } from "../repositories/user.repository";
import { userService } from "../services/user.service";
import { createNewUser, getAllUsers } from "../services/user.service-mongoDB";

class UserController {
  public async getAllUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.getList();

      const userMongoDB = await getAllUsersService();
      console.log("userMongoDB", userMongoDB);

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
      const result = await userService.getById(Number(req.params.id));
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
      const { id: userId } = req.params;

      const updatedUsers = userService.updateUser({ dto, userId });

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
      const newUsers = userService.removeUserById(Number(req.params.id));

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
      const newUser = userService.create(dto);

      createNewUser(dto);

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
