import { autoinject, ComponentDetached } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router, RoutableComponentCanActivate, NavigationCommand } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { AuthApi } from "app/apis/auth.api";
import { AuthDto, Utilities, Validation } from "mean-au-ts-shared";
import {ValidationController, ValidationRules} from 'aurelia-validation';
import * as toastr from 'toastr';
import { IAuth } from "../../../services/auth/auth.service";

@autoinject
export class SignInMain implements RoutableComponentCanActivate, ComponentDetached{

  private requestBody: AuthDto.SignInDto = new AuthDto.SignInDto();
  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private validationController: ValidationController,
    private auth: IAuth
  ) { 
    Validation.ensureDecoratorsOn(this.requestBody, ValidationRules);
    this.validationController.addObject(this.requestBody);
  }

  signIn() {
    // Explictly create the reqest body so we get type checking
    this.requestBody.email = this.form.getValue<AuthDto.SignInDto>('email');
    this.requestBody.password = this.form.getValue<AuthDto.SignInDto>('password');

    this.validationController.validate().then((result) => {
      if (!result.valid)
        return toastr.error(Validation.getErrorResults(result.results)[0].message);

      this.authApi.signin(this.requestBody).then(data => {
        this.router.navigateToRoute('home');
        toastr.success(`Welcome, ${data.firstName} ${data.lastName}`);
      })
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
