/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';

import {Aurelia, Container} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import { configureRootContainer } from 'config/container.config';
import { globalResources } from 'config/resource.config';
import 'bootstrap';
import { Router } from 'aurelia-router';
import { IAuth } from 'shared/services/auth/auth.service';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources(globalResources)
    .plugin(PLATFORM.moduleName('aurelia-validation'))

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  configureRootContainer(aurelia.container);

  aurelia.start().then(() => {
    let auth: IAuth = Container.instance.get(IAuth);
    if (auth.currentUser) {
      aurelia.setRoot(PLATFORM.moduleName('shells/admin/index'));
    } else {
      aurelia.setRoot(PLATFORM.moduleName('shells/anonymous/index'));
    }
  });
}
