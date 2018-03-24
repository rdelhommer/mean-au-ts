import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";

class ForgotPasswordHandler implements IRequestHandler<AuthDto.ForgotPasswordDto, void> {
  validate(req: IAuthenticatedRequest<AuthDto.ForgotPasswordDto>): Promise<IAuthenticatedRequest<AuthDto.ForgotPasswordDto>> {
    return aureliaValidator.validateObject(
      req.body,
      Validation.ensureDecoratorsOn(req.body, ValidationRules)
    ).then(result => {
      return database.User.findOne({ resetPasswordToken: req.body.forgotPasswordToken }).then(user => {
        if (!user) throw new HandlerError(422, 'Invalid reset password token');

        // Attach the found user to the request so we can use it in the execute
        req.user = user;
        return req;
      });
    });
  }

  execute(req: IAuthenticatedRequest<AuthDto.ForgotPasswordDto>): Promise<void> {
    req.user.password = req.body.newPassword;
    req.user.resetPasswordToken = null;
    req.user.resetPasswordExpires = null;

    // Save and remove the user from the request since it's technically an anonymous request
    return req.user.save()
      .then(user => { delete req.user; })
      .catch(err => {
        throw HandlerError.fromError(422, err);
      })
  }
}

export const forgotPasswordHandler = new ForgotPasswordHandler();
