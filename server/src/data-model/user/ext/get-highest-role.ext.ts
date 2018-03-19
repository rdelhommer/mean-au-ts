import { IUserModel } from "data-model/user/user.model";
import { Enums } from "mean-au-ts-shared";

export function getHighestRole(): Enums.UserRoles {
  var self: IUserModel = this;

  return this.roles && this.roles.indexOf(Enums.UserRoles.Admin) !== -1 ? Enums.UserRoles.Admin :
    this.roles && this.roles.indexOf(Enums.UserRoles.Technician) !== -1 ? Enums.UserRoles.Technician : 
    Enums.UserRoles.Anonymous
};