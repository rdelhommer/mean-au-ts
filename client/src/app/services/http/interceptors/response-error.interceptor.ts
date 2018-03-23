import { autoinject } from "aurelia-framework";
import { IEnv } from "config/env.config";
import { IAuth } from "app/services/auth/auth.service";
import { ICache } from "app/services/cache/cache.service";
import { Router } from "aurelia-router";
import * as toastr from 'toastr';

@autoinject
export class ResponseErrorInterceptor {
  constructor(
    private auth: IAuth,
    private router: Router
  ) { }

  private handle401(response: Response): Response {
    if (response.status !== 401) return response;

    if (this.auth.isAuthenticated) {
      this.auth.clearAuth();
    }

    this.router.navigate('/account/signin');
    return response;
  }

  run(response: Response): Promise<Response> {
    response = this.handle401(response);

    return response.clone().json().then(body => {
      throw new Error(body.message);
    });
  }
}
