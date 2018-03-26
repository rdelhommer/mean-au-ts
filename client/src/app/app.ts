import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, PipelineStep, Next, NavigationInstruction, Redirect } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { IAuth } from './services/auth/auth.service';
import { AuthApi } from 'app/apis/auth.api';
import * as toastr from 'toastr';
import { Enums } from 'mean-au-ts-shared';

@autoinject
export class App {
  router: Router;

  constructor(
    private auth: IAuth,
    private authApi: AuthApi
  ) { }

  signOut() {
    this.authApi.signout().then(response => {
      this.auth.signOut();
      this.router.navigateToRoute('home');
    })
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.options.pushState = true;

    config.addAuthorizeStep({
      run: (instruction: NavigationInstruction, next: Next): Promise<any> => {
        if(this.auth.isNavigationAuthorized(instruction)) {
          return next();
        } else {
          toastr.error('You do not have permission to access that page.')
          return next.cancel();
        }
      }
    })

    config.map([
      {
        route: [''],
        name: 'home',
        moduleId: PLATFORM.moduleName('app/modules/home/index'),
        nav: true,
        title: 'Home',
        settings: {
          allowedRoles: [Enums.UserRoles.Anonymous]
        }
      },
      {
        route: 'account',
        name: 'account',
        moduleId: PLATFORM.moduleName('app/modules/account/index'),
        nav: true,
        title: 'Account',
        settings: {
          allowedRoles: [Enums.UserRoles.Anonymous]
        }
      }
    ]);

    this.router = router;
  }
}
