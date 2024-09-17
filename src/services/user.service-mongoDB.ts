import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";

export const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await userRepository.getList();
  if (!result) {
    throw new Error("Users retrieved failed");
  }
  return result;
};

export const createNewUser = async (dto: IUser): Promise<IUser> => {
  return await userRepository.create(dto);
};

export const getSingleUser = async (userId: string): Promise<IUser> => {
  const result = userRepository.getById(userId);
  if (!result) {
    throw new Error("User not found !");
  }

  return await result;
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  const isExist = userRepository.getById(userId);
  if (!isExist) {
    throw new Error("User not found !");
  }

  const result = await User.findOneAndDelete({ _id: userId });
  if (!result) {
    throw new Error("User delete failed");
  }
  return result;
};

export const updateUserHandler = async (
  userId: string,
  payload: Partial<IUser>,
): Promise<IUser> => {
  return await userRepository.updateUser(userId, payload);
};
