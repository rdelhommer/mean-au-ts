import { Request, Response } from "express";
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";
import { config } from "config/config";
import { IUserModel } from "data-model/user/user.model";
import { MongoError } from "mongodb";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";

class SignUpHandler implements IRequestHandler<AuthDto.SignUpDto, IUserModel> {
  validate(req: IAuthenticatedRequest<AuthDto.SignUpDto>): Promise<IAuthenticatedRequest<AuthDto.SignUpDto>> {
    if (config.auth.isSignupDisabled)
      return Promise.reject(new HandlerError(422, 'Sign up has been temporarily disabled'));

    Validation.ensureDecoratorsOn(AuthDto.SignUpDto, ValidationRules)
    return aureliaValidator.validateObject(req.body).then(result => req);
  }

  execute(req: IAuthenticatedRequest<AuthDto.SignUpDto>): Promise<IUserModel> {
    // Init user and add missing fields
    var user = new database.User(req.body);
    user.displayName = user.firstName + ' ' + user.lastName;

    // Then save the user
    return user.save()
      .then(user => {
        req.user = user;

        return user;
      })
      .catch((err: MongoError) => {
        if (err.code === 11000) {
          throw new HandlerError(422, `The provided email is already in use`)
        }

        throw err;
      });
  }
}

export const signUpHandler = new SignUpHandler();
