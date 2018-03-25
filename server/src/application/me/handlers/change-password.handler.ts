import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";
import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { MeDto, Validation } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";

class ChangePasswordHandler implements IRequestHandler<MeDto.ChangePasswordDto, void> {
  validate(req: IAuthenticatedRequest<MeDto.ChangePasswordDto>): Promise<IAuthenticatedRequest<MeDto.ChangePasswordDto>> {
    let rules = ValidationRules
      .ensure((x: MeDto.ChangePasswordDto) => x.currentPassword)
      .satisfies((v: any) => {
        return req.user.isAuthenticated(v);
      })
      .withMessage('Your current password is not correct');

    Validation.ensureDecoratorsOn(MeDto.ChangePasswordDto, rules)
    return aureliaValidator.validateObject(req.body).then(result => req);
  }

  execute(req: IAuthenticatedRequest<MeDto.ChangePasswordDto>): Promise<void> {
    req.user.password = req.body.newPassword;

    return req.user.save()
      .then(user => undefined)
      .catch(err => {
        throw HandlerError.fromError(422, err);
      })
  }
}

export const changePasswordHandler = new ChangePasswordHandler();
