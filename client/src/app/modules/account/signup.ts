import { AuthApi } from "app/apis/auth.api";
import { autoinject } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { AuthDto } from "mean-au-ts-shared";

@autoinject
export class SignUp {

  signUpBody: AuthDto.SignUpDto = new AuthDto.SignUpDto();
  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router
  ) { }

  signUp() {
    // TODO: add validation
    this.authApi.signup(this.signUpBody).then(response => {
      this.router.navigateToRoute('home');
      // TODO: Toast and redirect to home
    })
  }

  detached() {
    this.form.clear();
  }
}
