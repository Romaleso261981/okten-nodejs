/* eslint-disable no-console */
import { FilterQuery } from "mongoose";

import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { ApiError } from "../errors/api-error";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = {};

    // Перетворюємо ключі, щоб працювали такі параметри як age[gte], age[lt] тощо
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    const {
      limit = 5,
      page = 1,
      search,
      orderBy,
      order,
    } = queryObj as IUserListQuery;

    if (search) {
      filterObj.name = { $regex: search, $options: "i" };
    }

    const skip = limit * (page - 1);

    console.log("orderBy", orderBy);

    if (orderBy) {
      if (orderBy === UserListOrderByEnum.AGE_GTE) {
        filterObj.age = { $gte: order };
      } else if (orderBy === UserListOrderByEnum.AGE_LTE) {
        filterObj.age = { $lte: order };
      } else if (orderBy === UserListOrderByEnum.AGE_GT) {
        filterObj.age = { $gt: order };
      } else if (orderBy === UserListOrderByEnum.AGE_LT) {
        filterObj.age = { $lt: order };
      } else {
        throw new ApiError("Invalid orderBy", 400);
      }
    }

    console.log("filterObj", filterObj);

    return await Promise.all([
      User.find(filterObj).limit(limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const newUser = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      age: dto.age,
      phone: dto.phone,
      role: dto.role,
      isVerified: dto.isVerified,
      isDeleted: dto.isDeleted,
    };
    return await User.create(newUser);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("+password");
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const isExist = await User.findByIdAndDelete(userId);
    if (!isExist) {
      throw new Error("User not found !");
    }

    const result = await User.findOneAndDelete({ _id: userId });
    if (!result) {
      throw new Error("User delete failed");
    }

    return result;
  }

  public async updateUser(id: string, dto: Partial<IUser>): Promise<IUser> {
    const isExist = await User.findOne({ _id: id });

    if (!isExist) {
      throw new Error("User not found !");
    }

    const updatedUserData: Partial<IUser> = { ...dto };

    const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
      new: true,
    });
    if (!result) {
      throw new Error("User update failed");
    }
    return result;
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async updateById<T>(userId: string, dto: T): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async findUsersNotLoggedInSince(
    date30DaysAgo: Date,
  ): Promise<IUser[]> {
    return await User.find({ lastLogin: { $lt: date30DaysAgo } });
  }
}

export const userRepository = new UserRepository();
