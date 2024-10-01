/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jsonwebtoken from "jsonwebtoken";

import configs from "../configs";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
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

  public verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.ACCESS_SECRET_KEY;
          break;

        case TokenTypeEnum.REFRESH:
          secret = configs.ACCESS_REFRESH_KEY;
          break;

        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
          break;

        case ActionTokenTypeEnum.VERIFY_EMAIL:
          secret = configs.ACTION_VERIFY_SECRET;
          break;

        default:
          throw new ApiError("Invalid token type", 400);
      }

      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e.message);
      throw new ApiError("Invalid token", 401);
    }
  }

  public generateActionTokens(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: string;

    switch (tokenType) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      case ActionTokenTypeEnum.VERIFY_EMAIL:
        secret = configs.ACTION_VERIFY_SECRET;
        expiresIn = configs.ACTION_VERIFY_EXPIRATION;
        break;
      case ActionTokenTypeEnum.CHANGE_PASSWORD:
        secret = configs.CHANGE_PASSWORD_SECRET;
        expiresIn = configs.CHANGE_PASSWORD_EXPIRATION;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }
}

export const tokenService = new TokenService();
