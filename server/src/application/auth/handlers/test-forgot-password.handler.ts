import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";

class TestForgotPasswordHandler implements IRequestHandler<AuthDto.TestForgotPasswordDto, void> {
  validate(req: IAuthenticatedRequest<AuthDto.TestForgotPasswordDto>): Promise<IAuthenticatedRequest<AuthDto.TestForgotPasswordDto>> {
    Validation.ensureDecoratorsOn(AuthDto.TestForgotPasswordDto, ValidationRules)
    return aureliaValidator.validateObject(req.query).then(result => req);
  }

  execute(req: IAuthenticatedRequest<AuthDto.TestForgotPasswordDto>): Promise<void> {
    // ensure a user exists with that token
    return database.User.findOne({ resetPasswordToken: req.query.forgotPasswordToken }).then(user => {
      if (!user) throw new HandlerError(422, 'Invalid reset password token')
    });
  }
}

export const testForgotPasswordHandler = new TestForgotPasswordHandler();
