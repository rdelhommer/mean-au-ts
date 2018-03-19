import { IUserModel } from 'data-model/user/user.model';
import { Enums } from 'mean-au-ts-shared';

export function isAnonymous(): boolean {
  var self: IUserModel = this;

  // User is not admin or technician
  return self.roles.indexOf(Enums.UserRoles.Admin) === -1 && self.roles.indexOf(Enums.UserRoles.Technician) === -1;
};