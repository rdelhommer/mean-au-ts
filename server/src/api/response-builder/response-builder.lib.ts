import { Request } from 'express';
import { IResponseBuilderStep } from 'api/response-builder/response-builder-step.lib';
import { GeneralDto, Enums } from 'mean-au-ts-shared';
import { IAuthenticatedRequest } from 'application/request-handler';

export interface IResponseBuilder {
  buildResponse(req: IAuthenticatedRequest, data: any): GeneralDto.SuccessResponseBody;
}

export class ResponseBuilder implements IResponseBuilder {
  constructor(private steps: IResponseBuilderStep[]) {

  }

  buildResponse(req: IAuthenticatedRequest, data: any): GeneralDto.SuccessResponseBody {
    let response: GeneralDto.SuccessResponseBody = {
      handledAs: Enums.UserRoles.Anonymous,
      data: data
    };

    this.steps.forEach(s => response = s.pipe(response, req))

    return response;
  }
}
