import { autoinject, ComponentDetached } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router, RoutableComponentCanActivate, NavigationCommand } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { AuthApi } from "app/apis/auth.api";
import { AuthDto, Utilities, Validation } from "mean-au-ts-shared";
import {ValidationController, ValidationRules} from 'aurelia-validation';
import * as toastr from 'toastr';
import { IAuth } from "../../../services/auth/auth.service";
import { IValidator } from "app/services/validator/validator.service";

@autoinject
export class SignInMain implements RoutableComponentCanActivate, ComponentDetached{

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
      this.authApi.signin(this.requestBody).then(data => {
        this.router.navigateToRoute('home');
        toastr.success(`Welcome, ${data.firstName} ${data.lastName}`);
      })
    }).catch(error => {
      return toastr.error(error.errors[0].message);
    })
  }

  canActivate(): NavigationCommand {
    if (!this.auth.isAuthenticated) return;

    return {
      navigate: (router: Router) => {
        router.navigateToRoute('account')
      }
    }
  }

  detached() {
    this.form.clear();
  }
}
