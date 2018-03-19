import { HookNextFunction } from "mongoose";
import * as validator from 'validator';
import { IUserModel } from "data-model/user/user.model";

export function validateEmail(next: HookNextFunction) {
  var self: IUserModel = this;

  if (validator.isEmail(self.email, { require_tld: false })) return next();

  return next(new Error(`${self.email} is not a valid email address`))
}