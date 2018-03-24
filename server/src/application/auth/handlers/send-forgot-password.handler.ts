import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";
import { HandlerError } from "api/handler.error";
import { database } from "data-model/mongoose.config";
import { mailer } from "lib/mailer.lib";
import { config } from "config/config";
import { newGuid } from "lib/guid.lib";

class SendForgotPasswordHandler implements IRequestHandler<AuthDto.SendForgotPasswordDto, void> {
  validate(req: IAuthenticatedRequest<AuthDto.SendForgotPasswordDto>): Promise<IAuthenticatedRequest<AuthDto.SendForgotPasswordDto>> {
    return aureliaValidator.validateObject(
      req.body,
      Validation.ensureDecoratorsOn(req.body, ValidationRules)
    ).then(result => {
      return database.User.findOne({ email: req.body.email }).then(user => {
        if (!user) throw new HandlerError(422, `The email you provided does not exist in our system`);

        // Attach the found user to the request so we can use it in the execute
        req.user = user;
        return req;
      })
    });
  }

  execute(req: IAuthenticatedRequest<AuthDto.SendForgotPasswordDto>): Promise<void> {
    let now = new Date();

    req.user.resetPasswordToken = newGuid();
    req.user.resetPasswordExpires = new Date(now.setHours(now.getHours() + config.auth.resetPasswordLifetimeHours))

    // Save the token and send the reset password email
    return req.user.save().then(user => {
      let resetUrl = `${config.auth.domain}/account/reset-password/${user.resetPasswordToken}`;
      let msg =
        `Hello ${user.firstName} ${user.lastName},<br/><br/>` +
        `A password reset has been requested for your ${config.shared.app.appName} account.  ` +
        `If you did not make this request, you may ignore this email.  ` +
        `Otherwise, please click on the link below to reset your password.  ` +
        `This link will expire in ${config.auth.resetPasswordLifetimeHours} hours.<br/><br/>` +
        `<a href="${resetUrl}">${resetUrl}</a>`;

      mailer.send(user.email, `${config.shared.app.appName}: Password Reset`, msg);

      // Remove the user from the request since it's technically an anonymous request
      delete req.user;
    })
  }
}

export const sendForgotPasswordHandler = new SendForgotPasswordHandler();
