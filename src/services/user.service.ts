import { ApiError } from "../errors/api-error";
import { addetUserSchema, aditingSchema } from "../helpers/joi";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { write } from "./fs.service";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUser): Promise<IUser> {
    const { error } = addetUserSchema.validate(dto);

    if (error) {
      throw new ApiError(error.message, 400);
    }
    const users = await userRepository.getList();
    let id: number = 1;

    if (users.length !== 0) {
      id = users[users.length - 1].id + 1;
    }

    const newUser: IUser = { ...dto, id };

    userRepository.create(newUser);
    return newUser;
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async removeUserById(userId: number): Promise<IUser[]> {
    if (!userId) {
      throw new ApiError("wrong userId", 404);
    }
    const users = await userRepository.getList();

    const user = users.find((user) => user.id === Number(userId));

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const updatedUsers = users.filter((user) => user.id !== Number(userId));

    await write(updatedUsers);
    return updatedUsers;
  }

  public async updateUser({
    dto,
    userId,
  }: {
    dto: IUser;
    userId: string;
  }): Promise<IUser> {
    const { error } = aditingSchema.validate(dto);
    if (error) {
      throw new ApiError(error.message, 400);
    }
    const users = await userRepository.getList();

    const userIndex = users.findIndex((user) => user.id === Number(userId));

    if (userIndex === -1) {
      throw new ApiError("User not found", 404);
    }

    const oldFfildName = users[userIndex].name;
    const oldFfildEmail = users[userIndex].email;

    users[userIndex].name = dto.name ?? oldFfildName;
    users[userIndex].email = dto.email ?? oldFfildEmail;

    await write(users);

    return users[userIndex];
  }
}

export const userService = new UserService();
