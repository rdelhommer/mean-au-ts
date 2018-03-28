import { autoinject } from "aurelia-framework";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { Router } from "aurelia-router";
import { ValidationRules } from "aurelia-validation";
import * as toastr from 'toastr'
import { FormWrap } from "resources/elements/form-wrap/form-wrap";
import { IValidator } from "shared/services/validator/validator.service";
import { AuthApi } from "shared/apis/auth.api";

@autoinject
export class SendForgotPassword {
  private requestBody: AuthDto.SendForgotPasswordDto = new AuthDto.SendForgotPasswordDto();

  form: FormWrap

  constructor(
    private validator: IValidator,
    private authApi: AuthApi,
    private router: Router
  ) {
    Validation.ensureDecoratorsOn(AuthDto.SendForgotPasswordDto, ValidationRules);
   }
  
  sendForgotPasswordEmail() {
    this.validator.validateObject(this.requestBody).then(() => {
      this.authApi.sendForgotPassword(this.requestBody).then(data => {
        toastr.success(`Password reset sent to: ${this.requestBody.email}`);
        this.form.clear();
        this.router.navigateToRoute('signin')
      })
    }).catch(error => {
      return toastr.error(error.errors[0].message);
    })
  }
}
