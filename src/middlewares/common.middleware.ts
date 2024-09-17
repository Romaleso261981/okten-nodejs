import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, _: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
