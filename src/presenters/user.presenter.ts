import configs from "../configs";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
  IUserResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  public toPublicResDto(entity: IUser): IUserResponse {
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

  public toPrivateResponseDto(user: IUser): IUserResponse {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
      avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
    };
  }

  public toListResDto(
    entities: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserListResponse {
    return {
      data: entities.map(this.toPublicResDto),
      total,
      ...query,
    };
  }
}
export const userPresenter = new UserPresenter();
