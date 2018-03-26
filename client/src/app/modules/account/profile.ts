import { RoutableComponentActivate, NavigationCommand, Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { UserDto, MeDto, Validation } from "mean-au-ts-shared";
import { FormWrap } from "app/resources/elements/form-wrap/form-wrap";
import { ValidationController, ValidationRules, Validator } from "aurelia-validation";
import { MeApi } from "app/apis/me.api";
import { IValidator, ValidationError } from "app/services/validator/validator.service";
import * as toastr from 'toastr';
import { IAuth } from "app/services/auth/auth.service";
 
@autoinject
export class AccountProfile implements RoutableComponentActivate {

  generalInformation: MeDto.ProfileDto = new MeDto.ProfileDto();
  changePasswordDetails: MeDto.ChangePasswordDto = new MeDto.ChangePasswordDto();

  generalInformationForm: FormWrap
  changePasswordForm: FormWrap

  constructor(
    private meApi: MeApi,
    private validator: IValidator,
    private auth: IAuth
  ) {
    Validation.ensureDecoratorsOn(MeDto.ProfileDto, ValidationRules);
    Validation.ensureDecoratorsOn(MeDto.ChangePasswordDto, ValidationRules);
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

  updateGeneralInfo() {
    this.validator.validateObject(this.generalInformation).then(results => {
      this.meApi.updateProfile(this.generalInformation).then(() => {
        toastr.success('Profile updated successfully');
      });
    }).catch((error: ValidationError) => {
      toastr.error(error.errors[0].message);
    })
  }

  canActivate(): NavigationCommand {
    if (this.auth.isAuthenticated) return;

    return {
      navigate: (router: Router) => {
        router.navigateToRoute('signin')
      }
    }
  }

  

  activate() {
    return this.meApi.me().then(response => {
      this.generalInformation = response;
    })
  }
}
