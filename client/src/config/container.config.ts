import { Container } from "aurelia-framework";
import { Env, IEnv } from "./env.config";
import { Fetch } from "app/services/http/fetch.service";
import { IHttp } from "app/services/http/http.service";
import { JwtAuth } from "app/services/auth/auth-jwt.service";
import { LocalStorageCache } from "app/services/cache/local-storage-cache.service";
import { IAuth } from "app/services/auth/auth.service";
import { ICache } from "app/services/cache/cache.service";
import { IValidator } from "app/services/validator/validator.service";
import { AureliaValidator } from "app/services/validator/aurelia-validator.service";

export function configureRootContainer(rootContainer: Container) {
  rootContainer.registerSingleton(IAuth, JwtAuth);
  rootContainer.registerSingleton(ICache, LocalStorageCache)
  rootContainer.registerSingleton(IHttp, Fetch)
  rootContainer.registerSingleton(IEnv, Env)
  rootContainer.registerSingleton(IValidator, AureliaValidator);
}
