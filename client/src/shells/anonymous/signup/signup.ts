import { autoinject } from "aurelia-framework";
import { Router, NavigationCommand } from "aurelia-router";
import { AuthDto } from "mean-au-ts-shared";
import { FormWrap } from "resources/elements/form-wrap/form-wrap";
import { AuthApi } from "shared/apis/auth.api";
import { IAuth } from "shared/services/auth/auth.service";
import { ComponentDetached } from "aurelia-templating";

@autoinject
export class SignUp implements ComponentDetached {

  signUpBody: AuthDto.SignUpDto = new AuthDto.SignUpDto();
  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private auth: IAuth
  ) { }

  signUp() {
    // TODO: add validation
    this.auth.signOut()
    this.authApi.signup(this.signUpBody).then(response => {
      this.router.navigateToRoute('home');
      // TODO: Toast and redirect to home
    })
  }

  detached() {
    this.form.clear();
  }
}
