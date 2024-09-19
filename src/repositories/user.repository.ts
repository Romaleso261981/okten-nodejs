import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    const result = await User.find();
    if (!result) {
      throw new Error("Users retrieved failed");
    }
    return result;
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
    const result = await User.findById(userId);
    if (!result) {
      throw new Error("User not found !");
    }
    return result;
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
}

export const userRepository = new UserRepository();
