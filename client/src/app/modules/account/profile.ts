import { RoutableComponentActivate } from "aurelia-router";
import { MeApi } from "../../apis/me.api";
import { autoinject } from "aurelia-framework";
import { UserDto } from "mean-au-ts-shared";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";

@autoinject
export class AccountProfile implements RoutableComponentActivate {

  details: UserDto.UserPublicDto
  detailsForm: FormWrap
  changePasswordForm: FormWrap

  constructor(
    private meApi: MeApi
  ) { }

  activate() {
    return this.meApi.me().then(response => {
      this.details = response;
    })
  }
}
