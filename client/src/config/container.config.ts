import { Container } from "aurelia-framework";
import { Env, IEnv } from "./env.config";
import { IAuth } from "shared/services/auth/auth.service";
import { JwtAuth } from "shared/services/auth/auth-jwt.service";
import { ICache } from "shared/services/cache/cache.service";
import { LocalStorageCache } from "shared/services/cache/local-storage-cache.service";
import { IHttp } from "shared/services/http/http.service";
import { Fetch } from "shared/services/http/fetch.service";
import { IValidator } from "shared/services/validator/validator.service";
import { AureliaValidator } from "shared/services/validator/aurelia-validator.service";

export function configureRootContainer(rootContainer: Container) {
  rootContainer.registerSingleton(IAuth, JwtAuth);
  rootContainer.registerSingleton(ICache, LocalStorageCache)
  rootContainer.registerSingleton(IHttp, Fetch)
  rootContainer.registerSingleton(IEnv, Env)
  rootContainer.registerSingleton(IValidator, AureliaValidator);
}
