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
    private authApi: AuthApi,
    private aurelia: Aurelia
  ) { }

  signOut() {
    this.authApi.signout()
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.options.pushState = true;

    console.log('admin configure');
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

  activate() {
    if (this.auth.currentUser) return;

    this.aurelia.setRoot(PLATFORM.moduleName('shells/admin/index'));
  }
}
