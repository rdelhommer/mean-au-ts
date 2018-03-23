import { AuthApi } from "app/apis/auth.api";
import { autoinject } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";

@autoinject
export class SignUp {

  form: FormWrap

  constructor(
    private authApi: AuthApi,
    private router: Router
  ) { }

  signUp() {
    // TODO: add validation
    this.authApi.signup({
      firstName: this.form.getValue('firstName'),
      lastName: this.form.getValue('lastName'),
      phone: this.form.getValue('phone'),
      email: this.form.getValue('email'),
      password: this.form.getValue('password')
    }).then(response => {
      this.router.navigateToRoute('home');
      // TODO: Toast and redirect to home
    })
  }

  detached() {
    this.form.clear();
  }
}
