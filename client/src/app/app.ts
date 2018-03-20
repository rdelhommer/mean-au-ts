import {Aurelia, autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration, PipelineStep, Next, NavigationInstruction} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { SideNav } from './resources/elements/side-nav/side-nav';
import { IAuth } from './services/auth/auth.service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthApi } from 'app/apis/auth.api';
import * as toastr from 'toastr'

@autoinject
export class App {
  router: Router;
  signOut: Function = this.authApi.signout.bind(this.authApi);

  constructor(
    private authApi: AuthApi,
    private auth: IAuth
  ) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.options.pushState = true;

    config.map([
      {
        route: [''],
        name: 'home',
        moduleId: PLATFORM.moduleName('app/modules/home/index'),
        nav: true,
        title: 'Home' 
      },
      {
        route: 'account',
        name: 'account',
        moduleId: PLATFORM.moduleName('app/modules/account/index'),
        nav: true,
        title: 'Account'
      }
    ]);

    this.router = router;
  }

  attached() {
    toastr.success('hhihiihi')
  }
}
