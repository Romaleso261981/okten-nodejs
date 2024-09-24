import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import configs from "../../configs";
import { ApiError } from "../../errors/api-error";
import { signInSchema, signUpSchema } from "../../helpers/joi";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

class UserValidation {
  public validationSignUpUser() {
    return (req: Request, _: Response, next: NextFunction) => {
      const { body } = req;
      try {
        const { error } = signUpSchema.validate(body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValidEditUser() {
    return (req: Request, _: Response, next: NextFunction) => {
      const { body } = req;
      try {
        const { error } = signUpSchema.validate(body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValidAdedeUser() {
    return (req: Request, _: Response, next: NextFunction) => {
      const { body } = req;
      try {
        const { error } = signUpSchema.validate(body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validationSignInUser() {
    return (req: Request, _: Response, next: NextFunction) => {
      const { body } = req;
      try {
        const { error } = signInSchema.validate(body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isAuth() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { authorization = "" } = req.headers;
      const [bearer, token] = authorization.split(" ");
      try {
        if (bearer !== "Bearer" || !token) {
          return res.status(401).json({
            message: "Not authorized",
            clarification:
              "Please, provide a token in request authorization header",
          });
        }

        const { id } = jwt.verify(token, configs.ACCESS_SECRET_KEY);
        if (!id) {
          return res.status(401).json({
            message: "Not authorized",
            clarification: "Token not have id",
          });
        }

        const user = await User.findById(id);
        if (!user) {
          return res.status(401).json({ message: "user not found" });
        }

        req.user = user;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userValidation = new UserValidation();
