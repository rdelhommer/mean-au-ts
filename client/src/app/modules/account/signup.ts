import { AuthApi } from "app/apis/auth.api";
import { autoinject } from "aurelia-framework";
import { FormGroup } from "app/resources/elements/form-group/form-group";
import { Router, NavigationCommand } from "aurelia-router";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { AuthDto } from "mean-au-ts-shared";
import { IAuth } from "app/services/auth/auth.service";

@autoinject
export class SignUp {

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
