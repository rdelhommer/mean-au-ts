import { IRequestHandler, IAuthenticatedRequest } from "application/request-handler";
import { MeDto, Validation } from "mean-au-ts-shared";
import { ValidationRules } from "aurelia-validation";
import { aureliaValidator } from "lib/validator.lib";

class UpdateProfileHandler implements IRequestHandler<MeDto.ProfileDto, void> {
  validate(req: IAuthenticatedRequest<MeDto.ProfileDto>): Promise<IAuthenticatedRequest<MeDto.ProfileDto>> {
    return aureliaValidator.validateObject(
      req.body,
      Validation.ensureDecoratorsOn(req.body, ValidationRules)
    ).then(result => req);
  }

  execute(req: IAuthenticatedRequest<MeDto.ProfileDto>): Promise<void> {
    console.log(req.body);
    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.email = req.body.email;
    req.user.phone = req.body.phone;

    return req.user.save().then(user => {
      console.log(user);
    });
  }
}

export const updateProfileHandler = new UpdateProfileHandler();
