/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import * as jsonwebtoken from "jsonwebtoken";
import { isObjectIdOrHexString } from "mongoose";

import configs from "../configs";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
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

  public verifyAccessToken(accessToken: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        accessToken,
        configs.ACCESS_SECRET_KEY,
      ) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
