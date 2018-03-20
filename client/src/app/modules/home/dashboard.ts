import { autoinject } from "aurelia-framework";
import { IAuth } from "app/services/auth/auth.service";
import { RouteConfig } from "aurelia-router";

@autoinject
export class HomeDashboard {
  constructor(
    public auth: IAuth
  ) {
  }
}
