import { autoinject, ComponentDetached } from "aurelia-framework";
import { Router, RoutableComponentCanActivate, NavigationCommand } from "aurelia-router";
import { AuthDto, Utilities, Validation } from "mean-au-ts-shared";
import {ValidationController, ValidationRules} from 'aurelia-validation';
import * as toastr from 'toastr';
import { FormWrap } from "resources/elements/form-wrap/form-wrap";
import { AuthApi } from "shared/apis/auth.api";
import { IAuth } from "shared/services/auth/auth.service";
import { IValidator } from "shared/services/validator/validator.service";

@autoinject
export class SignInMain implements ComponentDetached {

  private requestBody: AuthDto.SignInDto = new AuthDto.SignInDto();
  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private validationController: ValidationController,
    private auth: IAuth,
    private validator: IValidator
  ) { 
    Validation.ensureDecoratorsOn(AuthDto.SignInDto, ValidationRules);
  }

  signIn() {
    this.validator.validateObject(this.requestBody).then(() => {
      this.auth.signOut()
      this.authApi.signin(this.requestBody).then(data => {
        this.router.navigateToRoute('home');
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
