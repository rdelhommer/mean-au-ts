import * as crypto from 'crypto';
import { IUserModel } from 'data-model/user/user.model';

export function hashPassword(password: string): string {
  var self: IUserModel = this;

  return crypto.pbkdf2Sync(password, new Buffer(self.salt, 'base64'), 10000, 64, 'SHA1')
    .toString('base64');
};