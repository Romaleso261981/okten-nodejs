import { NextFunction, Request, Response } from "express";

import { ISignIn, IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";

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

  public async isAuthCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization = "" } = req.headers;
      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer" || !token) {
        return res.status(401).json({
          message: "Not authorized",
          clarification:
            "Please, provide a token in request authorization header",
        });
      }

      const { userId } = tokenService.verifyToken(token);

      if (!userId) {
        return res.status(401).json({
          message: "Not authorized",
          clarification: "Token not have id",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
