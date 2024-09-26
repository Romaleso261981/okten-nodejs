import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import {
  IResetPasswordSend,
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interfaces/user.interface";
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

  public async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.logOut(req.headers.authorization);
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

  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IResetPasswordSend;
      await authService.forgotPasswordSendEmail(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IResetPasswordSet;

      await authService.forgotPasswordSet(dto, jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
