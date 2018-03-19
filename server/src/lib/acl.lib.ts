import { Response, NextFunction } from "express";
import { Enums } from "mean-au-ts-shared";
import { IAuthenticatedRequest } from "application/request-handler";

function restrictToRoles(...roles: Enums.UserRoles[]) {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles || roles.length === 0) return next();
    if (!req.user && roles.indexOf(Enums.UserRoles.Anonymous) !== -1) return next();
    if (roles.some(r => req.user.roles.indexOf(r) !== -1)) return next();

    return res.status(403).send({
      message: 'You are not authorized to perform this action'
    });
  }
}

export const acl = {
  restrictToRoles: restrictToRoles
}
