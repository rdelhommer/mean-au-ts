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
  signOut: Function = this.authApi.signout.bind(this.authApi);

  constructor(
    private auth: IAuth,
    private authApi: AuthApi
  ) { }

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


    config.addAuthorizeStep({
      run: (instruction: NavigationInstruction, next: Next): Promise<any> => {
        if (!this.auth.isAuthenticated && (instruction.fragment === '/account' || instruction.fragment === '/account/profile')) {
          return next.cancel(new Redirect('account/signin'))
        }

        if (this.auth.isAuthenticated && instruction.fragment === '/account/signin') {
          return next.cancel(new Redirect('account'))
        }

        if (this.auth.isAuthenticated && instruction.fragment === '/account/signup') {
          return next.cancel(new Redirect('account'))
        }

        return next();
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
