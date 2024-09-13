import bcrypt from "bcrypt";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const getAllUsersService = async (): Promise<IUser[] | null> => {
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
