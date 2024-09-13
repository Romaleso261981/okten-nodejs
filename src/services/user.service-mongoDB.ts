/* eslint-disable no-console */
import bcrypt from "bcrypt";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  if (!result) {
    throw new Error("Users retrieved failed");
  }
  return result;
};

export const createNewUser = async (dto: IUser): Promise<IUser> => {
  const { name, email, password } = dto;

  const userCheck = await User.findOne({ email });
  if (userCheck) {
    throw new Error("user model with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    password: hashedPassword,
    name,
    email,
  });

  return newUser;
};

export const getSingleUser = async (userId: string): Promise<IUser> => {
  const result = await User.findById(userId);
  if (!result) {
    throw new Error("User not found !");
  }

  return result;
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new Error("User not found !");
  }

  const result = await User.findByIdAndDelete(userId);
  if (!result) {
    throw new Error("User delete failed");
  }
  return result;
};

export const updateUserHandler = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new Error("User not found !");
  }

  const updatedUserData: Partial<IUser> = { ...payload };

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  if (!result) {
    throw new Error("User update failed");
  }
  return result;
};
