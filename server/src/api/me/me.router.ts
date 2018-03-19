import { DefaultResponseBuilder } from "api/response-builder/default-response-builder.lib";
import { IUser } from "data-model/user/user.model";
import { UserDto, Enums, MeDto } from "mean-au-ts-shared";
import { ModuleExecutor } from "../module.executor";
import { Router } from "express";
import { profileHandler } from "application/me/handlers/profile.handler";
import { UserModel } from "data-model/user/user.schema";
import { changePasswordHandler } from "application/me/handlers/change-password.handler";
import { acl } from "lib/acl.lib";

const executor = new ModuleExecutor();
const router = Router();

router.get('/', executor.execute<any, IUser>(profileHandler, null))

router.post('/change-password',
  acl.restrictToRoles(Enums.UserRoles.Technician, Enums.UserRoles.Admin),
  executor.execute<MeDto.ChangePasswordDto>(changePasswordHandler, MeDto.ChangePasswordDto))

executor.responseBuilder = new DefaultResponseBuilder(
  new Map<Enums.UserRoles, Function>([
    [Enums.UserRoles.Anonymous, UserDto.UserPublicDto]
  ])
);

export const meRouter = router;