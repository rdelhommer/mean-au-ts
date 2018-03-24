import { Request } from "express";
import { database } from "data-model/mongoose.config";
import { IUser, IUserModel } from "data-model/user/user.model";
import { HandlerError } from "api/handler.error";
import { UserDto } from "mean-au-ts-shared";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";

class ProfileHandler implements IRequestHandler<void, IUser> {
  validate(req: IAuthenticatedRequest<void>): Promise<IAuthenticatedRequest<void>> {
    if (req.user.isAnonymous())
      return Promise.reject(new HandlerError(401, 'You must be logged in to access this.'));

    return Promise.resolve(req);
  }

  execute(req: IAuthenticatedRequest<void>): Promise<IUser> {
    return Promise.resolve(req.user);
  }
}

export const profileHandler = new ProfileHandler();
