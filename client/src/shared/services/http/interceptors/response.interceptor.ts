import { autoinject } from "aurelia-framework";
import { IAuth } from "shared/services/auth/auth.service";

@autoinject
export class ResponseInterceptor {
  constructor(
    private auth: IAuth
  ) { }

  private authHook(response: Response): Response {
    return this.auth.processResponse(response);
  }

  run(response: Response): Response {
    response = this.authHook(response);

    return response;
  }
}
