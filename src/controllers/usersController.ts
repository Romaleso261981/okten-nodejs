import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ITokenPayload } from "../interfaces/token.interface";
import { userPresenter } from "../presenters/user.presenter";
import {
  createNewUser,
  deleteAvatar,
  deleteUserById,
  getAllUsers,
  getSingleUser,
  updateUserHandler,
  uploadAvatar,
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

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const avatar = req.files.avatar as UploadedFile;
      const user = await uploadAvatar(jwtPayload, avatar);
      const response = userPresenter.toPrivateResponseDto(user);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const user = await deleteAvatar(jwtPayload.userId);
      const response = userPresenter.toPrivateResponseDto(user);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
