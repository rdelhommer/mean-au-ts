import { autoinject } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { AuthApi } from "app/apis/auth.api";
import { AuthDto, ensureDecoratorsOn } from "mean-au-ts-shared";
import {ValidationController, ValidationRules} from 'aurelia-validation';

@autoinject
export class SignInMain {

  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private validationController: ValidationController
  ) { 
    ensureDecoratorsOn(this, ValidationRules);
    this.validationController.addObject(this);
    this.validationController.validate().then((result) => {
      console.log(result);
    })
  }

  signIn() {
    this.authApi.signin({
      email: this.form.getValue('email'),
      password: this.form.getValue('password')
    }).then(data => {
      this.router.navigateToRoute('home');
      // TODO: Toast and redirect to home
    }) 
  }

  detached() {
    this.form.clear();
  }
}
