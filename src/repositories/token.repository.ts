import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await Token.deleteMany({ _userId: userId });
  }
}

export const tokenRepository = new TokenRepository();
