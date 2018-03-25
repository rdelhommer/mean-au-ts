import { Request, Response } from "express";
import * as mongoose from 'mongoose';
import { AuthDto, UserDto, Validation } from "mean-au-ts-shared";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";
import { logger } from "lib/winston.lib";
import { IUserModel } from "data-model/user/user.model";
import { aureliaValidator } from "lib/validator.lib";
import { ValidationRules, ValidationController } from "aurelia-validation";

class SignInHandler implements IRequestHandler<AuthDto.SignInDto, IUserModel> {
  validate(req: IAuthenticatedRequest<AuthDto.SignInDto>): Promise<IAuthenticatedRequest<AuthDto.SignInDto>> {
    Validation.ensureDecoratorsOn(AuthDto.SignInDto, ValidationRules)
    return aureliaValidator.validateObject(req.body).then(result => req);
  }

  execute(req: IAuthenticatedRequest<AuthDto.SignInDto>): Promise<IUserModel> {
    return database.User.findOne({
      email: req.body.email.toLowerCase()
    }).then(user => {
      if (!user || !user.isAuthenticated(req.body.password))
        throw new HandlerError(401, 'Invalid username or password');
  
      logger.info(`Successful signin: ${user.email}`)
  
      /**
       * NOTE:
       * The user should be attached to the request so that
       * a token can be generated from its id in the token response builder step
       */
      req.user = user;
  
      return user;
    });
  }
}

export const signInHandler = new SignInHandler();