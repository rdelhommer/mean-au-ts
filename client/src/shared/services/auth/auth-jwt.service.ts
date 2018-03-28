import { IEnv } from "config/env.config";
import { autoinject, computedFrom, Aurelia, PLATFORM } from "aurelia-framework";
import { GeneralDto, Enums, UserDto } from "mean-au-ts-shared";
import { NavigationInstruction } from "aurelia-router";
import { IAuth } from "shared/services/auth/auth.service";
import { ICache } from "shared/services/cache/cache.service";

@autoinject
export class JwtAuth implements IAuth {

  private authAlteredFlag: boolean;

  @computedFrom('authAlteredFlag')
  get currentUser(): UserDto.UserPublicDto {
    return this.cache.get(ICache.Mode.Global, this.env.localStorage.userKey);
  }

  constructor(
    private cache: ICache,
    private env: IEnv,
    private aurelia: Aurelia
  ) { }

  authorizeRequest(request: Request): Request {
    let token = this.cache.get(ICache.Mode.Global, this.env.localStorage.authKey);
    
    if (token == null) return request;
    request.headers.set('Authorization', `JWT ${token}`)

    return request;
  }

  signOut(): void {
    this.cache.clear();
    this.aurelia.setRoot(PLATFORM.moduleName('shells/anonymous/index'));
  }

  signIn(user: UserDto.UserPublicDto): void {
    this.cache.set(ICache.Mode.Global, this.env.localStorage.userKey, user);
    this.aurelia.setRoot(PLATFORM.moduleName('shells/admin/index'));
  }

  processResponse(response: Response): Response {
    response.clone().json().then((body: GeneralDto.SuccessResponseBody) => {
      this.cache.set(ICache.Mode.Global, this.env.localStorage.authKey, body.token);
    })

    return response;
  }
}
