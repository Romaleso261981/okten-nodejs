import configs from "../configs";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair } from "../interfaces/token.interface";
import { ISignIn, IUser } from "../interfaces/user.interface";
import { commonMiddleware } from "../middlewares/common.middleware";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    await emailService.sendMail(EmailTypeEnum.WELCOME, configs.SMTP_EMAIL, {
      name: user.name,
    });

    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    await tokenRepository.deleteByUserId(user._id);

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({ ...tokens, _userId: user._id });

    return { user, tokens };
  }

  public async logOut(authorization: string): Promise<void> {
    const [bearer, token] = authorization.split(" ");

    console.log("bearer", bearer);

    if (!token) {
      throw new ApiError("You are not authorized", 401);
    }

    const { userId } = commonMiddleware.verifyAccessToken(token);

    if (!userId) {
      throw new ApiError(
        "invalid userId or token expired or wrong verifyAccessToken",
        404,
      );
    }

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("Not authorized", 401);
    }

    tokenRepository.deleteByUserId(userId);

    await emailService.sendMail(EmailTypeEnum.LOG_OUT, configs.SMTP_EMAIL, {
      name: user.name,
    });
  }

  public async userIsAuth(dto: any): Promise<IUser> {
    const { authorization = "" } = dto;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new ApiError("invalid authorization header", 404);
    }

    const { userId } = commonMiddleware.verifyAccessToken(token);

    if (!userId) {
      throw new ApiError(
        "invalid userId or token expired or wrong verifyAccessToken",
        404,
      );
    }

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("Not authorized", 401);
    }

    return user;
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }

  public async refreshAccessToken(refreshToken: string): Promise<ITokenPair> {
    const { userId } = tokenService.verifyRefreshToken(refreshToken);

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    return tokens as ITokenPair;
  }
}

export const authService = new AuthService();
