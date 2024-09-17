import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
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
    return await User.findById(userId);
  }

  public async deleteUser(userId: string): Promise<IUser> {
    return await User.findByIdAndDelete(userId);
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
}

export const userRepository = new UserRepository();
