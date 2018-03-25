import { IResponseBuilderStep } from "api/response-builder/response-builder-step.lib";
import { GeneralDto, Enums } from "mean-au-ts-shared";
import { IAuthenticatedRequest } from "application/request-handler";

export class RoleResponseBuilderStep implements IResponseBuilderStep {
  pipe(response: GeneralDto.SuccessResponseBody, req: IAuthenticatedRequest<any>): GeneralDto.SuccessResponseBody {
    response.handledAs = req.user ? req.user.getHighestRole() : Enums.UserRoles.Anonymous;
    return response;
  }
}
