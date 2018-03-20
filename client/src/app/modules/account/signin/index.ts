import { autoinject, PLATFORM } from "aurelia-framework";
import { RoutableComponentActivate, Router, RouterConfiguration } from "aurelia-router";
import * as $ from 'jquery'
import { AuthApi } from "app/apis/auth.api";

@autoinject
export class SignInIndex {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: '',
        name: 'signin',
        moduleId: PLATFORM.moduleName('./signin'),
        nav: true,
        title: 'Signin'
      }, {
        route: 'forgot',
        name: 'forgot-password',
        moduleId: PLATFORM.moduleName('./forgot-password'),
        nav: true,
        title: 'Forgot Password'
      },
    ]);

    this.router = router;
  }
}
