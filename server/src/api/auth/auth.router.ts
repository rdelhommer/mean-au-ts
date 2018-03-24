import { IUser } from "data-model/user/user.model";
import { DefaultResponseBuilder } from "api/response-builder/default-response-builder.lib";
import { signUpHandler } from "application/auth/handlers/signup.handler";
import { signInHandler } from "application/auth/handlers/signin.handler";
import { signOutHandler } from "application/auth/handlers/signout.handler";
import { Enums, UserDto, AuthDto } from "mean-au-ts-shared";
import { ModuleExecutor } from "../module.executor";
import { Router } from "express";
import { forgotPasswordHandler } from "application/auth/handlers/forgot-password.handler";
import { sendForgotPasswordHandler } from "application/auth/handlers/send-forgot-password.handler";
import { testForgotPasswordHandler } from "application/auth/handlers/test-forgot-password.handler";

const executor = new ModuleExecutor();
const router = Router();

router.post('/signup', executor.execute(signUpHandler, AuthDto.SignUpDto))
  .post('/signin', executor.execute(signInHandler, AuthDto.SignInDto))
  .post('/signout', executor.execute(signOutHandler, null))
  .post('/send-forgot-password', executor.execute(sendForgotPasswordHandler, null))
  .get('/forgot-password', executor.execute(testForgotPasswordHandler, null))
  .post('/forgot-password', executor.execute(forgotPasswordHandler, null))

executor.responseBuilder = new DefaultResponseBuilder(
  new Map<Enums.UserRoles, Function>([
    [Enums.UserRoles.Anonymous, UserDto.UserPublicDto]
  ]
));

export const authRouter = router;
