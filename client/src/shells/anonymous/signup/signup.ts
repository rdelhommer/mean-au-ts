import { autoinject } from "aurelia-framework";
import { Router, NavigationCommand } from "aurelia-router";
import { AuthDto, Validation } from "mean-au-ts-shared";
import { FormWrap } from "resources/elements/form-wrap/form-wrap";
import { AuthApi } from "shared/apis/auth.api";
import { IAuth } from "shared/services/auth/auth.service";
import { ComponentDetached } from "aurelia-templating";
import { ValidationRules } from "aurelia-validation";
import { IValidator } from "shared/services/validator/validator.service";
import * as toastr from 'toastr';

@autoinject
export class SignUp implements ComponentDetached {

  signUpBody: AuthDto.SignUpDto = new AuthDto.SignUpDto();
  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private validator: IValidator
  ) { 
    Validation.ensureDecoratorsOn(AuthDto.SignUpDto, ValidationRules);
  }

  signUp() {
    this.validator.validateObject(this.signUpBody).then(() => {
      this.authApi.signup(this.signUpBody).then(data => {
        toastr.success(`Welcome, ${data.firstName} ${data.lastName}`);
      })
    }).catch(error => {
      return toastr.error(error.errors[0].message);
    })
  }

  detached() {
    this.form.clear();
  }
}
