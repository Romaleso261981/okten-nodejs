import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export const getAllUsers = async (): Promise<IUser[] | null> => {
  return await userRepository.getList();
};

export const createNewUser = async (dto: IUser): Promise<IUser> => {
  return await userRepository.create(dto);
};

export const getSingleUser = async (userId: string): Promise<IUser> => {
  return await userRepository.getById(userId);
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  return await userRepository.deleteUser(userId);
};

export const updateUserHandler = async (
  userId: string,
  payload: Partial<IUser>,
): Promise<IUser> => {
  return await userRepository.updateUser(userId, payload);
};
