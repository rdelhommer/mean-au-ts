import { Router, RouterConfiguration, NavigationInstruction, Next, Redirect } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Enums } from 'mean-au-ts-shared';
import { autoinject } from 'aurelia-framework';
import { IAuth } from 'app/services/auth/auth.service';

@autoinject
export class AccountIndex {
  router: Router;

  constructor(
    private auth: IAuth
  ) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.map([{
      route: ['', 'profile'],
      name: 'profile',
      moduleId: PLATFORM.moduleName('./profile'),
      nav: true,
      title: 'Profile',
      settings: {
        allowedRoles: [Enums.UserRoles.Admin, Enums.UserRoles.Technician]
      }
    }, {
      route: 'signin',
      name: 'signin',
      moduleId: PLATFORM.moduleName('./signin/index'),
      nav: true,
      title: 'Sign In',
      settings: {
        allowedRoles: [Enums.UserRoles.Anonymous]
      }
    }, {
      route: 'signup',
      name: 'signup',
      moduleId: PLATFORM.moduleName('./signup'),
      nav: true,
      title: 'Sign Up',
      settings: {
        allowedRoles: [Enums.UserRoles.Anonymous]
      }
    }]);

    this.router = router;
  }
}
