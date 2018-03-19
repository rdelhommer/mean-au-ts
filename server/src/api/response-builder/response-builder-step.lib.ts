import { Request } from "express";
import {GeneralDto} from 'mean-au-ts-shared';
import { IAuthenticatedRequest } from "application/request-handler";
export interface IResponseBuilderStep {
  pipe(response: GeneralDto.SuccessResponseBody, req: IAuthenticatedRequest): GeneralDto.SuccessResponseBody
}