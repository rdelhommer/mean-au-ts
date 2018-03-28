import { Router, RouterConfiguration, NavigationInstruction, Next, Redirect } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { autoinject } from 'aurelia-framework';

export class AccountIndex {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.map([{
      route: '',
      name: 'profile',
      moduleId: PLATFORM.moduleName('./profile'),
      nav: true,
      title: 'Profile'
    }]);

    this.router = router;
  }
}
