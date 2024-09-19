import { NextFunction, Request, Response } from "express";

import { ISignIn, IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async isAuthCheck(req: Request, _: Response, next: NextFunction) {
    try {
      req.user = await authService.userIsAuth(req.headers);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await authService.refreshAccessToken(
        req.body.refreshToken,
      );
      return res.status(201).json({
        status: "successful",
        tokens,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
