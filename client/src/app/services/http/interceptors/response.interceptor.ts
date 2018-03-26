import { autoinject } from "aurelia-framework";
import { IEnv } from "config/env.config";
import { IAuth } from "app/services/auth/auth.service";
import { ICache } from "app/services/cache/cache.service";

@autoinject
export class ResponseInterceptor {
  constructor(
    private cache: ICache,
    private env: IEnv,
    private auth: IAuth
  ) { }

  private signIn(response: Response): Response {
    return this.auth.signIn(response);
  }

  run(response: Response): Response {
    response = this.signIn(response);

    return response;
  }
}
