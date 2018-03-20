import { autoinject } from "aurelia-framework";
import { IEnv } from "config/env.config";
import { ICache } from "app/services/cache/cache.service";
import { IAuth } from "app/services/auth/auth.service";

@autoinject
export class RequestInterceptor {
  constructor(
    private cache: ICache,
    private env: IEnv,
    private auth: IAuth
  ) { }

  private signOut(request: Request): Request {
    if (request.url.indexOf('/api/auth/signout') === -1) return request;

    // Delete the current auth token
    this.cache.delete(ICache.Mode.Global, this.env.localStorage.authKey);
    return request;
  }

  private attachToken(request: Request): Request {
    return this.auth.authorizeRequest(request);
  }

  run(request: Request): Request {
    request = this.attachToken(request);
    request = this.signOut(request);

    return request;
  }
}
