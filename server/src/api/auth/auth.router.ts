import { IUser } from "data-model/user/user.model";
import { DefaultResponseBuilder } from "api/response-builder/default-response-builder.lib";
import { signUpHandler } from "application/auth/handlers/signup.handler";
import { signInHandler } from "application/auth/handlers/signin.handler";
import { signOutHandler } from "application/auth/handlers/signout.handler";
import { Enums, UserDto, AuthDto } from "mean-au-ts-shared";
import { ModuleExecutor } from "../module.executor";
import { Router } from "express";

const executor = new ModuleExecutor();
const router = Router();

router.post('/signup',
  executor.execute<AuthDto.SignUpDto, IUser>(signUpHandler, AuthDto.SignUpDto))

router.post('/signin',
  executor.execute<AuthDto.SignInDto, IUser>(signInHandler, AuthDto.SignInDto))

router.post('/signout',
  executor.execute(signOutHandler, null))

executor.responseBuilder = new DefaultResponseBuilder(
  new Map<Enums.UserRoles, Function>([
    [Enums.UserRoles.Anonymous, UserDto.UserPublicDto]
  ]
));

export const authRouter = router;
