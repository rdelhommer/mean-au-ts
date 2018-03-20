import { IEnv } from "config/env.config";
import { ICache } from "app/services/cache/cache.service";
import { IAuth } from "app/services/auth/auth.service";
import { autoinject, computedFrom } from "aurelia-framework";
import { GeneralDto } from "mean-au-ts-shared";

@autoinject
export class JwtAuth implements IAuth {

  private responseFlag: boolean;

  @computedFrom('responseFlag')
  get isAuthenticated() : boolean {
    return !!this.cache.get(ICache.Mode.Global, this.env.localStorage.authKey);
  }

  constructor(
    private cache: ICache,
    private env: IEnv
  ) { }

  authorizeRequest(request: Request): Request {
    let token = this.cache.get(ICache.Mode.Global, this.env.localStorage.authKey);
    
    if (token == null) return request;
    request.headers.set('Authorization', `JWT ${token}`)

    return request;
  }

  clearAuth(): void {
    this.cache.delete(ICache.Mode.Global, this.env.localStorage.authKey);
  }

  storeAuth(response: Response): Response {
    response.clone().json().then((body: GeneralDto.SuccessResponseBody) => {
      this.responseFlag = !this.responseFlag;

      this.cache.set(ICache.Mode.Global, this.env.localStorage.authKey, body.token);
    })

    return response;
  }
}