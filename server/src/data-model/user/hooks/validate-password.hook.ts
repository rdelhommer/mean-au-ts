import { HookNextFunction, ValidationError } from "mongoose";
import { IUserModel } from "data-model/user/user.model";
import { config } from "config/config";
import { owasp } from "lib/owasp.lib";

export function validatePassword(next: HookNextFunction) {
  var self: IUserModel = this;

  if (!config.password.strongPasswords || !self.isModified('password')) return next();

  var result = owasp.test(self.password);
  if (result.errors.length) {
    var error = result.errors.join(' ');
    return next(new Error(error));
  }

  next();
}