import { IUserModel } from "data-model/user/user.model";

declare global {
  module Express {
    interface Request {
      user: IUserModel
    }
  }
}
