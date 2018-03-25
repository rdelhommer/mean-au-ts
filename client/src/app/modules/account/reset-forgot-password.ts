import { RoutableComponentActivate, Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { UserDto, MeDto, Validation, AuthDto } from "mean-au-ts-shared";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { ValidationController, ValidationRules, Validator } from "aurelia-validation";
import { IValidator, ValidationError } from "app/services/validator/validator.service";
import * as toastr from 'toastr';
import { AuthApi } from "app/apis/auth.api";
 
@autoinject
export class ResetForgotPassword implements RoutableComponentActivate {

  isErrored: boolean
  changePasswordDetails: AuthDto.ForgotPasswordDto = new AuthDto.ForgotPasswordDto();
  changePasswordForm: FormWrap

  constructor(
    private authApi: AuthApi,
    private validator: IValidator,
    private router: Router
  ) {
    Validation.ensureDecoratorsOn(AuthDto.ForgotPasswordDto, ValidationRules);
  }

  resetPassword() {
    this.validator.validateObject(this.changePasswordDetails).then(results => {
      this.authApi.resetForgottenPassword(this.changePasswordDetails).then(() => {
        toastr.success('Password reset successfully.  Please sign in');
        this.changePasswordForm.clear();
        this.router.navigateToRoute('signin')
      });
    }).catch((error: ValidationError) => {
      toastr.error(error.errors[0].message);
    })
  }

  activate(params: { id: string }) {
    this.changePasswordDetails.forgotPasswordToken = params.id;

    this.authApi.testForgotPassword({ forgotPasswordToken: params.id }).catch(() => {
      this.isErrored = true;
    });
  }
}
