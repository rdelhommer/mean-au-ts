import * as crypto from 'crypto';
import { HookNextFunction, Document } from "mongoose";
import { IUserModel } from 'data-model/user/user.model';

export function hashPasswordHook(next: HookNextFunction) {
  var self: IUserModel = this;

  if (self.password && self.isModified('password')) {
    self.salt = crypto.randomBytes(16).toString('base64');
    self.password = self.hashPassword(self.password);
  }

  next();
}