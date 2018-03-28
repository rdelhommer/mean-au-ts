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

  constructor(
    private auth: IAuth,
    private authApi: AuthApi
  ) { }

  signOut() {
    this.authApi.signout().then(response => {
      this.auth.signOut();
      // TODO: SET SHELL TO ANONYMOUS
      this.router.navigateToRoute('home');
    })
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.options.pushState = true;

    config.map([
      {
        route: [''],
        name: 'home',
        moduleId: PLATFORM.moduleName('./home/home'),
        nav: true,
        title: 'Home'
      },
      {
        route: 'account',
        name: 'account',
        moduleId: PLATFORM.moduleName('./account/index'),
        nav: true,
        title: 'Account'
      }
    ]);

    this.router = router;
  }
}
