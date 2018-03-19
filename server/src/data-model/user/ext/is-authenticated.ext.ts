import * as crypto from 'crypto';
import { IUserModel } from 'data-model/user/user.model';

export function isAuthenticated(password) {
  var self: IUserModel = this;

  return self.password === self.hashPassword(password);
};