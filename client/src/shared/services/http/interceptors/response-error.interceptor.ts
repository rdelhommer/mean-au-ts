import { autoinject } from "aurelia-framework";
import { IAuth } from "shared/services/auth/auth.service";

@autoinject
export class ResponseErrorInterceptor {
  constructor(
    private auth: IAuth
  ) { }

  private handle401(response: Response): Response {
    if (response.status !== 401) return response;

    this.auth.signOut();

    return response;
  }

  run(response: Response): Promise<Response> {
    response = this.handle401(response);

    return response.clone().json().then(body => {
      throw new Error(body.message);
    });
  }
}
