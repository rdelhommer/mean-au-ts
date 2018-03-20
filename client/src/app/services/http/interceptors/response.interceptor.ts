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

  private storeAuth(response: Response): Response {
    return this.auth.storeAuth(response);
  }

  run(response: Response): Response {
    response = this.storeAuth(response);

    return response;
  }
}
