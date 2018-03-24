import { DefaultResponseBuilder } from "api/response-builder/default-response-builder.lib";
import { IUser } from "data-model/user/user.model";
import { UserDto, Enums, MeDto } from "mean-au-ts-shared";
import { ModuleExecutor } from "../module.executor";
import { Router } from "express";
import { profileHandler } from "application/me/handlers/profile.handler";
import { UserModel } from "data-model/user/user.schema";
import { changePasswordHandler } from "application/me/handlers/change-password.handler";
import { acl } from "lib/acl.lib";
import { updateProfileHandler } from "application/me/handlers/update-profile.handler";

const executor = new ModuleExecutor();
const router = Router();

router.get('/', executor.execute(profileHandler, null))

router.put('/',
    acl.restrictToRoles(Enums.UserRoles.Technician, Enums.UserRoles.Admin),
    executor.execute(updateProfileHandler, null))

router.post('/change-password',
    acl.restrictToRoles(Enums.UserRoles.Technician, Enums.UserRoles.Admin),
    executor.execute(changePasswordHandler, MeDto.ChangePasswordDto))

executor.responseBuilder = new DefaultResponseBuilder(
  new Map<Enums.UserRoles, Function>([
    [Enums.UserRoles.Anonymous, MeDto.ProfileDto]
  ])
);

export const meRouter = router;
