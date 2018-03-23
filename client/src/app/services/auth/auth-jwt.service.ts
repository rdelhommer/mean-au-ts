import { IEnv } from "config/env.config";
import { ICache } from "app/services/cache/cache.service";
import { IAuth } from "app/services/auth/auth.service";
import { autoinject, computedFrom } from "aurelia-framework";
import { GeneralDto, Enums, UserDto } from "mean-au-ts-shared";
import { NavigationInstruction } from "aurelia-router";

@autoinject
export class JwtAuth implements IAuth {

  private authAlteredFlag: boolean;

  @computedFrom('authAlteredFlag')
  get isAuthenticated() : boolean {
    return !!this.cache.get(ICache.Mode.Global, this.env.localStorage.authKey);
  }

  @computedFrom('authAlteredFlag')
  get currentUser(): UserDto.UserPublicDto {
    return this.cache.get(ICache.Mode.Global, this.env.localStorage.userKey);
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
    this.cache.delete(ICache.Mode.Global, this.env.localStorage.userKey);
    this.authAlteredFlag = !this.authAlteredFlag;
  }

  storeAuth(response: Response): Response {
    response.clone().json().then((body: GeneralDto.SuccessResponseBody) => {
      this.cache.set(ICache.Mode.Global, this.env.localStorage.authKey, body.token);
      this.cache.set(ICache.Mode.Global, this.env.localStorage.userKey, body.data);

      this.authAlteredFlag = !this.authAlteredFlag;
    })

    return response;
  }

  isNavigationAuthorized(instruction: NavigationInstruction): boolean {
    if (!instruction.config.settings || !instruction.config.settings.allowedRoles)
      return false;

    let allowedRoles: Enums.UserRoles[] = instruction.config.settings.allowedRoles;

    if (allowedRoles.some(r => r === Enums.UserRoles.Anonymous)) return true;

    let ret  = false;
    allowedRoles.forEach(a => ret = this.currentUser.roles.some(r => r === a));
    return ret;
  }
}
