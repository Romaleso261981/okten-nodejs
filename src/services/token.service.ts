/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jsonwebtoken from "jsonwebtoken";

import configs from "../configs";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, configs.ACCESS_SECRET_KEY, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.ACCESS_REFRESH_KEY,
      { expiresIn: configs.JWT_REFRESH_EXPIRATION },
    );
    return { accessToken, refreshToken };
  }

  public verifyAccesToken(token: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        token,
        configs.ACCESS_SECRET_KEY,
      ) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }

  public verifyRefreshToken(token: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        token,
        configs.ACCESS_SECRET_KEY,
      ) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
