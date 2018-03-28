import { autoinject } from "aurelia-framework";
import { IAuth } from "shared/services/auth/auth.service";

@autoinject
export class RequestInterceptor {
  constructor(
    private auth: IAuth
  ) { }

  private authHook(request: Request): Request {
    return this.auth.authorizeRequest(request);
  }

  run(request: Request): Request {
    request = this.authHook(request);

    return request;
  }
}
