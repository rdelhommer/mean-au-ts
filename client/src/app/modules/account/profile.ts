import { RoutableComponentActivate } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { UserDto, MeDto, Validation } from "mean-au-ts-shared";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { ValidationController, ValidationRules, Validator } from "aurelia-validation";
import { MeApi } from "app/apis/me.api";
import { IValidator, ValidationError } from "app/services/validator/validator.service";
import * as toastr from 'toastr';
 
@autoinject
export class AccountProfile implements RoutableComponentActivate {

  generalInformation: UserDto.UserPublicDto = new UserDto.UserPublicDto();
  changePasswordDetails: MeDto.ChangePasswordDto = new MeDto.ChangePasswordDto();

  generalInformationForm: FormWrap
  changePasswordForm: FormWrap

  constructor(
    private meApi: MeApi,
    private validator: IValidator
  ) {
    Validation.ensureDecoratorsOn(this.generalInformation, ValidationRules);
    Validation.ensureDecoratorsOn(this.changePasswordDetails, ValidationRules);
  }

  changePassword() {
    this.validator.validateObject(this.changePasswordDetails).then(results => {
      this.meApi.changePassword(this.changePasswordDetails).then(() => {
        toastr.success('Password changed successfully');
        this.changePasswordForm.clear();
      });
    }).catch((error: ValidationError) => {
      toastr.error(error.errors[0].message);
    })
  }

  updateProfile() {
    // TODO:
  }

  activate() {
    return this.meApi.me().then(response => {
      this.generalInformation = response;
    })
  }
}
