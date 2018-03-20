import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class HomeIndex {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {

    config.map([{
      route: ['', 'dashboard'],
      name: 'dashboard',
      moduleId: PLATFORM.moduleName('./dashboard'),
      nav: true,
      title: 'Dashboard'
    }]);

    this.router = router;
  }
}
