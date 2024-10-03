import configs from "../configs";
import { IPrivateUser, IUser } from "../interfaces/user.interface";

class UserPresenter {
  toPublicResDto(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      avatar: entity.avatar
        ? `${configs.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
    };
  }

  toPrivateResponseDto(user: IUser): IPrivateUser {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      role: user.role,
      avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
    };
  }
}
export const userPresenter = new UserPresenter();
