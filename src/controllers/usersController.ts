import { NextFunction, Request, Response } from "express";

import { addetUserSchema, aditingSchema } from "../helpers/joi";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { write } from "../services/fs.service";
import { userService } from "../services/user.service";

class UserController {
  public async getAllUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.getList();

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
      const userId = Number(req.params.userId);
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;
    const { id } = req.params;

    const { error } = aditingSchema.validate({ name, email });

    if (error) return new Error("Validation error:" + error.message);

    try {
      const users = await userRepository.getList();

      const userIndex = users.findIndex((user) => user.id === Number(id));

      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }

      const oldFfildName = users[userIndex].name;
      const oldFfildEmail = users[userIndex].email;

      users[userIndex].name = name ?? oldFfildName;
      users[userIndex].email = email ?? oldFfildEmail;

      await write(users);

      return res.status(201).json({
        updatedUsers: users[userIndex],
        status: "successful",
      });
    } catch (error) {
      next(error);
    }
  }

  public async removeUsersById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      if (id) {
        const newUsers = await userService.removeUserById(Number(id));

        return res.status(200).json({
          status: "successful",
          users: newUsers,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public async addedUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    const { error } = addetUserSchema.validate({ name, email, password });

    if (error) return new Error("Validation error:" + error.message);

    try {
      const users = await userRepository.getList();
      let id: number = 1;

      if (users.length !== 0) {
        id = users[users.length - 1].id + 1;
      }

      const newUser: IUser = { id, name, email, password };

      userRepository.create(newUser);

      return res.status(201).json({
        newUser,
        status: "successful",
      });
    } catch (error) {
      next(error);
    }
  }
}
export const userController = new UserController();
