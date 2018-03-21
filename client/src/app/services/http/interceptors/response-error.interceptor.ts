import { ICache } from "../../cache/cache.service";
import { autoinject } from "aurelia-framework";
import { IEnv } from "config/env.config";
import { Router } from "aurelia-router";
import * as toastr from 'toastr';
import { IAuth } from "../../auth/auth.service";

@autoinject
export class ResponseErrorInterceptor {
  constructor(
    private cache: ICache,
    private env: IEnv,
    private router: Router,
    private auth: IAuth
  ) { }

  private toast(response: Response): Response {
    response.clone().json().then(body => {
      toastr.error(body.message)
    })

    return response;
  }

  private redirect(response: Response): Response {
    if (response.status === 401) {
      this.auth.clearAuth();
      this.router.navigate('/account/signin')
    }

    return response;
  }

  run(response: Response) {
    response = this.toast(response);
    response = this.redirect(response);

    return response.clone().json().then(body => {
      throw new Error(body.message);
    })
  }
}
