import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, PipelineStep, Next, NavigationInstruction, Redirect } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import * as toastr from 'toastr';
import { Enums } from 'mean-au-ts-shared';
import { IAuth } from 'shared/services/auth/auth.service';
import { AuthApi } from 'shared/apis/auth.api';

@autoinject
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.options.pushState = true;

    config.map([{
      route: '',
      name: 'home',
      moduleId: PLATFORM.moduleName('./home/home'),
      nav: true,
      title: 'Home'
    }, {
      route: 'signin',
      name: 'signin',
      moduleId: PLATFORM.moduleName('./signin/index'),
      nav: true,
      title: 'Sign In'
    }, {
      route: 'signup',
      name: 'signup',
      moduleId: PLATFORM.moduleName('./signup/signup'),
      nav: true,
      title: 'Sign Up'
    }, {
      route: 'reset-forgot/:id',
      name: 'reset-forgot',
      moduleId: PLATFORM.moduleName('./reset-forgot-password/reset-forgot-password'),
      title: 'Reset Password'
    }]);

    this.router = router;
  }
}
