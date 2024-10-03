import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

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

export const uploadAvatar = async (
  jwtPayload: ITokenPayload,
  file: UploadedFile,
): Promise<IUser> => {
  const user = await userRepository.getById(jwtPayload.userId);

  if (user.avatar) {
    await s3Service.deleteFile(user.avatar);
  }

  const filePath = await s3Service.uploadFile(
    file,
    FileItemTypeEnum.USER,
    user._id,
  );

  return await userRepository.updateById(user._id, {
    avatar: filePath,
  });
};

export const deleteAvatar = async (userId: string): Promise<IUser> => {
  const user = await getSingleUser(userId);
  if (user.avatar) {
    await s3Service.deleteFile(user.avatar);
  }
  return await userRepository.updateById(userId, { avatar: null });
};
