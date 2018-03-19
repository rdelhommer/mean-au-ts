import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { MeDto, ensureDecoratorsOn } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";

class ChangePasswordHandler implements IRequestHandler<MeDto.ChangePasswordDto> {
  validate(req: IAuthenticatedRequest<MeDto.ChangePasswordDto>): Promise<IAuthenticatedRequest<MeDto.ChangePasswordDto>> {
    return aureliaValidator.validateObject(
      req.body, 
      ensureDecoratorsOn(req.body, ValidationRules)
    ).then(result => req);
  }
  
  execute(req: IAuthenticatedRequest<MeDto.ChangePasswordDto>): Promise<void> {
    req.user.password = req.body.newPassword;

    return req.user.save()
      .then(Promise.resolve)
      .catch(err => {
        throw HandlerError.fromError(422, err);
      })
  }
}

export const changePasswordHandler = new ChangePasswordHandler();
