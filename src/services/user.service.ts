import { ApiError } from "../errors/api-error";
import { addetUserSchema } from "../helpers/joi";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { write } from "./fs.service";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = dto;

    const { error } = addetUserSchema.validate({ name, email, password });

    if (error) {
      throw new ApiError(`validate error: ${error.message}`, 400);
    }

    return await userRepository.create({ name, email, password });
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async removeUserById(userId: number): Promise<IUser[]> {
    const users = await userRepository.getList();

    const user = users.find((user) => user.id === Number(userId));

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const updatedUsers = users.filter((user) => user.id !== Number(userId));

    await write(updatedUsers);

    return updatedUsers;
  }
}

export const userService = new UserService();
