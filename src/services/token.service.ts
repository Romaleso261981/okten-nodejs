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

  public verifyRefreshToken(refreshToken: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        refreshToken,
        configs.ACCESS_REFRESH_KEY,
      ) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid Refresh token", 400);
    }
  }
}

export const tokenService = new TokenService();
