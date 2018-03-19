import { Request } from 'express'
import { IResponseBuilderStep } from 'api/response-builder/response-builder-step.lib';
import { GeneralDto, Enums, Utilities } from 'mean-au-ts-shared';
import { IAuthenticatedRequest } from 'application/request-handler';

export class MaskResponseBuilderStep implements IResponseBuilderStep {

  constructor(private viewModelMap: Map<Enums.UserRoles, Function> = new Map<Enums.UserRoles, Function>()) {

  }

  pipe(response: GeneralDto.SuccessResponseBody, req: IAuthenticatedRequest): GeneralDto.SuccessResponseBody {
    if (response.data == null) return response;

    let AdminMask = this.viewModelMap.get(Enums.UserRoles.Admin);
    let TechnicianMask = this.viewModelMap.get(Enums.UserRoles.Technician);
    let PublicMask = this.viewModelMap.get(Enums.UserRoles.Anonymous);

    let highestRole = req.user ? req.user.getHighestRole() : Enums.UserRoles.Anonymous;

    let MaskToUse = null;
    if (highestRole === Enums.UserRoles.Admin) {
      MaskToUse = AdminMask || TechnicianMask || PublicMask;
    } else if (highestRole === Enums.UserRoles.Technician) {
      MaskToUse = TechnicianMask || PublicMask;
    } else {
      MaskToUse = PublicMask;
    }

    if (!MaskToUse) return response;

    // TODO: Allow custom mapping functions
    if (Array.isArray(response.data)) {
      response.data = response.data.map(o => Utilities.castTo(o, MaskToUse))
    } else {
      response.data = Utilities.castTo(response.data, MaskToUse)
    }

    return response;
  }
}