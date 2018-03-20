import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class AccountIndex {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([{
      route: ['', 'profile'],
      name: 'profile',
      moduleId: PLATFORM.moduleName('./profile'),
      nav: true,
      title: 'Profile'
    }, {
      route: 'signin',
      name: 'signin',
      moduleId: PLATFORM.moduleName('./signin/index'),
      nav: true,
      title: 'Sign In'
    }, {
      route: 'signup',
      name: 'signup',
      moduleId: PLATFORM.moduleName('./signup'),
      nav: true,
      title: 'Sign Up'
    }]);

    this.router = router;
  }
}
